using System.Data.Common;
using Amazon;
using Amazon.Runtime.CredentialManagement;
using Amazon.S3;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Amazon.SecurityToken;
using Amazon.SecurityToken.Model;
using Newtonsoft.Json;

namespace BoilerplateCombo;

public class SecretsManagerHelper
{
    public static async Task<Dictionary<string, string>> GetSecretsAsync(string secretName)
    {
        var chain = new CredentialProfileStoreChain();
        if (chain.TryGetAWSCredentials("frosthanddev", out var creds))
        {
            var options = new AmazonS3Config
            {
                RegionEndpoint = RegionEndpoint.APSoutheast1
            };
            var client = new AmazonS3Client(creds, options);
        }

        var stsClient = new AmazonSecurityTokenServiceClient(creds, RegionEndpoint.APSoutheast1);

        var assumeRoleResponse = await stsClient.AssumeRoleAsync(new AssumeRoleRequest
        {
            RoleArn = "arn:aws:iam::022499021574:role/fh-read-secret-role",
            RoleSessionName = "my-dev-session"
        });

        var credentials = assumeRoleResponse.Credentials;

        var secretsClient = new AmazonSecretsManagerClient(
            credentials.AccessKeyId,
            credentials.SecretAccessKey,
            credentials.SessionToken,
            RegionEndpoint.APSoutheast1 // or your actual region
        );
        
        var request = new GetSecretValueRequest
        {
            SecretId = secretName
        };

        var response = await secretsClient.GetSecretValueAsync(request);

        if (string.IsNullOrEmpty(response.SecretString))
            throw new Exception("Secret string is empty");

        return JsonConvert.DeserializeObject<Dictionary<string, string>>(response.SecretString);
    }
    
    
    public static string InjectPassword(string baseConnectionString, string password)
    {
        var builder = new DbConnectionStringBuilder
        {
            ConnectionString = baseConnectionString
        };

        // Standardize the key lookup (case-insensitive)
        if (builder.ContainsKey("Password"))
            builder["Password"] = password;
        else if (builder.ContainsKey("Pwd"))
            builder["Pwd"] = password;
        else
            builder.Add("Password", password);

        return builder.ConnectionString;
    }
}