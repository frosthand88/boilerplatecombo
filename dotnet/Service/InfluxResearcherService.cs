using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using InfluxDB.Client;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class InfluxResearcherService(InfluxDBClient client)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        string fluxQuery = $"from(bucket:\"{"mybucket"}\") |> range(start: -1h)";
        var query = await client.GetQueryApi().QueryAsync(fluxQuery, "myorg");
        foreach (var table in query)
        foreach (var record in table.Records)
            Console.WriteLine($"{record.GetTime()}: {record.GetValue()}");
        return new();
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        //return await context.researcher.FindAsync(id);
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        var point = PointData.Measurement("sensor_data")
            .Tag("sensor", "s1")
            .Field("temperature", 23.5)
            .Timestamp(DateTime.UtcNow, WritePrecision.Ns);
        client.GetWriteApi().WritePoint(point, "my-bucket", "my-org");
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