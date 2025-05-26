using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;
using Neo4j.Driver;

namespace BoilerplateCombo.Service;

public class NeoResearcherService(IDriver driver)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var session = driver.AsyncSession();;
        var result = await session.RunAsync("MATCH (p:Person {name: $name}) RETURN p", new { name = "Alice" });
        await result.ForEachAsync(r => Console.WriteLine(r["p"]));
        await session.CloseAsync();
        return new();
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        //return await context.researcher.FindAsync(id);
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        var session = driver.AsyncSession();
        await session.RunAsync("CREATE (p:Person {name: $name, age: $age})",
            new { name = "Alice", age = 30 });
        await session.CloseAsync();
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        var session = driver.AsyncSession();
        await session.RunAsync("MATCH (p:Person {name: $name}) SET p.age = $age",
            new { name = "Alice", age = 31 });
        await session.CloseAsync();
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        var session = driver.AsyncSession();
        await session.RunAsync("MATCH (p:Person {name: $name}) DELETE p", new { name = "Alice" });
        await session.CloseAsync();
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