using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BoilerplateCombo.Service;

public class MongoResearcherService(MongoClient client)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var db = client.GetDatabase("bench");
        var col = db.GetCollection<BsonDocument>("researchers");
        var result = await col.FindAsync(new BsonDocument("researcher_id", "Alice"));
        return new();
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        var db = client.GetDatabase("bench");
        var col = db.GetCollection<BsonDocument>("researchers");
        var result = await col.FindAsync(new BsonDocument("researcher_id", id));
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        var db = client.GetDatabase("bench");
        var col = db.GetCollection<BsonDocument>("researchers");
        var doc = new BsonDocument { { "name", "Alice" }, { "age", 30 } };
        await col.InsertOneAsync(doc);
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        var db = client.GetDatabase("bench");
        var col = db.GetCollection<BsonDocument>("researchers");
        var update = Builders<BsonDocument>.Update.Set("age", 31);
        await col.UpdateOneAsync(new BsonDocument("name", "Alice"), update);
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        var db = client.GetDatabase("bench");
        var col = db.GetCollection<BsonDocument>("researchers");
        await col.DeleteOneAsync(new BsonDocument("name", "Alice"));
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