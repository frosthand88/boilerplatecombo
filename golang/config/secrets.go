package config

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/secretsmanager"
	"github.com/aws/aws-sdk-go-v2/service/sts"
	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

// Call this early (in main or init) to load .env variables into process env
func LoadDotEnv() error {
	return godotenv.Load()
}

// getAssumedCredentials calls STS to assume role and returns AWS credentials
func getAssumedCredentials(ctx context.Context, roleArn string) (aws.Credentials, error) {
	// Load AWS config from environment (env vars must be loaded first)
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return aws.Credentials{}, fmt.Errorf("failed to load AWS config: %w", err)
	}

	stsClient := sts.NewFromConfig(cfg)

	resp, err := stsClient.AssumeRole(ctx, &sts.AssumeRoleInput{
		RoleArn:         &roleArn,
		RoleSessionName: aws.String("go-session"),
	})
	if err != nil {
		return aws.Credentials{}, fmt.Errorf("failed to assume role: %w", err)
	}

	return aws.Credentials{
		AccessKeyID:     *resp.Credentials.AccessKeyId,
		SecretAccessKey: *resp.Credentials.SecretAccessKey,
		SessionToken:    *resp.Credentials.SessionToken,
		Source:          "assume-role",
	}, nil
}

// LoadAndInjectSecrets fetches secret, patches config.yaml placeholders, writes config.patched.yaml
func LoadAndInjectSecrets(ctx context.Context, roleArn, secretName string) error {
	// Load .env first, so AWS_ACCESS_KEY_ID etc are set for SDK to pick up
	err := LoadDotEnv()
	if err != nil {
		fmt.Println("Warning: failed to load .env file or file missing, continuing with existing environment")
	}

	// Assume role to get temp creds
	creds, err := getAssumedCredentials(ctx, roleArn)
	if err != nil {
		return err
	}

	// Create AWS config with assumed credentials explicitly using NewStaticCredentialsProvider
	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			creds.AccessKeyID, creds.SecretAccessKey, creds.SessionToken)),
	)
	if err != nil {
		return err
	}

	// Create Secrets Manager client
	sm := secretsmanager.NewFromConfig(cfg)

	// Get secret value by name
	secretOut, err := sm.GetSecretValue(ctx, &secretsmanager.GetSecretValueInput{
		SecretId: &secretName,
	})
	if err != nil {
		return fmt.Errorf("failed to get secret: %w", err)
	}

	// Parse secret JSON into map[string]string
	var secretData map[string]string
	err = json.Unmarshal([]byte(*secretOut.SecretString), &secretData)
	if err != nil {
		return fmt.Errorf("failed to unmarshal secret JSON: %w", err)
	}

	// Read config.yaml file content
	content, err := os.ReadFile("config.yaml")
	if err != nil {
		return fmt.Errorf("failed to read config.yaml: %w", err)
	}
	configText := string(content)

	// Load config.yaml into Viper for structured access
	viper.SetConfigType("yaml")
	err = viper.ReadConfig(strings.NewReader(configText))
	if err != nil {
		return fmt.Errorf("failed to parse config.yaml with viper: %w", err)
	}

	// Get "databases" map as string->string map
	databases := viper.GetStringMapString("databases")

	for dbKey, connStr := range databases {
		if strings.Contains(connStr, "__SECRET__") {
			secretVal, ok := secretData[dbKey]
			if !ok || secretVal == "" {
				fmt.Printf("[WARN] No secret found for key: %s — leaving __SECRET__ unresolved\n", dbKey)
				continue
			}

			newConnStr := strings.Replace(connStr, "__SECRET__", secretVal, 1)
			fmt.Printf("[INFO] Replaced secret in '%s':\n  before: %s\n  after:  %s\n\n", dbKey, connStr, newConnStr)

			databases[dbKey] = newConnStr
		} else {
			fmt.Printf("[INFO] No __SECRET__ placeholder in '%s'\n", dbKey)
		}
	}

	// Update Viper config in-memory with patched database map
	// Force overwrite the "databases" section in viper
	for dbKey, val := range databases {
		viper.Set("databases."+dbKey, val)
	}

	// Write patched config to config.patched.yaml
	err = viper.WriteConfigAs("config.patched.yaml")
	if err != nil {
		return fmt.Errorf("failed to write patched config file: %w", err)
	}

	return nil
}
