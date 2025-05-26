using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class RedisResearcherService(Cluster cluster)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        ISession session = await cluster.ConnectAsync("benchmark_keyspace");
        var rs = await session.ExecuteAsync(new SimpleStatement("SELECT * FROM researchers"));
        foreach (var row in rs)
        {
            Console.WriteLine(row["column_name"]);
        }
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
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        // var existing = await context.researcher.FindAsync(id);
        // if (existing == null)
        //     return false;
        //
        // existing.name = updatedResearcher.name;
        // // existing.age = updatedResearcher.age;
        // await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        // var existing = await context.researcher.FindAsync(id);
        // if (existing == null)
        //     return false;
        //
        // context.researcher.Remove(existing);
        // await context.SaveChangesAsync();
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