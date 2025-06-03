using System.Data.Common;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Newtonsoft.Json;

namespace BoilerplateCombo;

public class SecretsManagerHelper
{
    public static async Task<Dictionary<string, string>> GetSecretsAsync(string secretName)
    {
        using var client = new AmazonSecretsManagerClient(); // configure AWS region/profile if needed

        var request = new GetSecretValueRequest
        {
            SecretId = secretName
        };

        var response = await client.GetSecretValueAsync(request);

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