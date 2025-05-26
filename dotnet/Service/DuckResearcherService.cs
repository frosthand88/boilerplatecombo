using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using DuckDB.NET.Data;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class DuckResearcherService(DuckDBConnection duckDbConnection)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var researchers = new List<Researcher2>();
        await duckDbConnection.OpenAsync();
        using var cmd = duckDbConnection.CreateCommand();
        cmd.CommandText = "select top 10 * from researchers";
        var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
            researchers.Add(new Researcher2
            {
                id = (long)reader["id"],
                name = (string)reader["name"],
                created_at = (DateTime)reader["created_at"]
            });
        return (researchers, researchers.Count);
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        //return await context.researcher.FindAsync(id);
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        using (var cmd = duckDbConnection.CreateCommand())
        {
            cmd.CommandText = "INSERT INTO users SET name = 'Bob' WHERE id = 1";
            await cmd.ExecuteNonQueryAsync();
        }
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        using (var cmd = duckDbConnection.CreateCommand())
        {
            cmd.CommandText = "UPDATE users SET name = 'Bob' WHERE id = 1";
            await cmd.ExecuteNonQueryAsync();
        }
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        using (var cmd = duckDbConnection.CreateCommand())
        {
            cmd.CommandText = "DELETE users SET name = 'Bob' WHERE id = 1";
            await cmd.ExecuteNonQueryAsync();
        }
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