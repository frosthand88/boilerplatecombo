package com.boilerplatecombo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import software.amazon.awssdk.services.sts.auth.StsAssumeRoleCredentialsProvider;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

import java.util.Collections;
import java.util.Map;

public class AwsSecretsRetriever {

    public static Map<String, String> fetchSecrets() {
        String regionStr = System.getProperty("AWS_REGION");
        if (regionStr == null) {
            throw new RuntimeException("AWS_REGION system property is not set");
        }
        Region region = Region.of(regionStr);
        String roleArn = "arn:aws:iam::022499021574:role/fh-read-secret-role";
        String secretName = "MyAppSecret";

        // Create STS client
        StsClient stsClient = StsClient.builder()
                .region(region)
                .build();

        // Create Assume Role credentials provider
        AwsCredentialsProvider credentialsProvider = StsAssumeRoleCredentialsProvider.builder()
                .stsClient(stsClient)
                .refreshRequest(r -> r.roleArn(roleArn).roleSessionName("springboot-session"))
                .build();

        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(region)
                .credentialsProvider(credentialsProvider)
                .build();

        GetSecretValueRequest request = GetSecretValueRequest.builder()
                .secretId(secretName)  // replace with your actual secret name/id
                .build();

        GetSecretValueResponse response = client.getSecretValue(request);
        String secretString = response.secretString();

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(secretString, Map.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Collections.emptyMap();
        }
    }
}
