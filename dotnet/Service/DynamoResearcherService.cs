using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class DynamoResearcherService(AmazonDynamoDBClient client)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var response = await client.GetItemAsync("researcher", new Dictionary<string, AttributeValue> { ["Id"] = new("1") });
        Console.WriteLine(response.Item["Name"].S);
        return new();
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        //return await context.researcher.FindAsync(id);
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        // researcher.created_at = DateTime.UtcNow;
        // context.researcher.Add(researcher);
        // await context.SaveChangesAsync();
        // return researcher;
        await client.PutItemAsync(new PutItemRequest
        {
            TableName = "researchers",
            Item = new Dictionary<string, AttributeValue>
            {
                ["Id"] = new("1"),
                ["Name"] = new("Alice")
            }
        });
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        await client.UpdateItemAsync(new UpdateItemRequest
        {
            TableName = "researcher",
            Key = new Dictionary<string, AttributeValue> { ["Id"] = new("1") },
            AttributeUpdates = new Dictionary<string, AttributeValueUpdate>
            {
                ["Name"] = new(new AttributeValue("Bob"), AttributeAction.PUT)
            }
        });

        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        await client.DeleteItemAsync("researcher", new Dictionary<string, AttributeValue> { ["Id"] = new("1") });
        return true;
    }

    public async Task<string> ExportResearchersAsCsvAsync()
    {
        // var researchers = await context.researcher.ToListAsync();
        // var csv = "Id,CreatedAt,Name\n";
        // foreach (var researcher in researchers)
        // {
        //     csv += $"{researcher.id},{researcher.created_at:O},{EscapeCsv(researcher.name)}\n";
        //     // $",{researcher.age}\n";
        // }
        // return 
        return "";
    }

    private string EscapeCsv(string value)
    {
        if (value.Contains(",") || value.Contains("\"") || value.Contains("\n"))
        {
            value = value.Replace("\"", "\"\"");
            return $"\"{value}\"";
        }
        return value;
    }
}