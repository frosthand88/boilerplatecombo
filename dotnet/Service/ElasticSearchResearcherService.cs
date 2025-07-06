using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;
using Nest;

namespace BoilerplateCombo.Service;

public class ElasticSearchResearcherService(ElasticClient client)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var result = client.Get<object>(1);
        return new();
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        var response = await client.GetAsync<Researcher2>(id, g => g.Index("researchers"));
        if (response.Found)
        {
            return response.Source;
        }
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        var person = new { Id = 1, Name = "Alice", Age = 30 };
        await client.IndexDocumentAsync(person);
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        await client.UpdateAsync<object>(1, u => u.Doc(new { Age = 31 }));
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        await client.DeleteAsync<object>(1);
        return true;
    }

    public async Task<string> ExportResearchersAsCsvAsync()
    {
        // Query all researchers from Elasticsearch
        var searchResponse = await client.SearchAsync<Researcher2>(s => s
            .Index("researchers")
            .Size(10000) // adjust as needed for your dataset size
            .Query(q => q.MatchAll())
        );

        var researchers = searchResponse.Documents;
        var csv = new System.Text.StringBuilder();
        // Write header
        csv.AppendLine("id,created_at,name");
        foreach (var r in researchers)
        {
            csv.AppendLine($"{r.id},{EscapeCsv(r.created_at.ToString("o"))},{EscapeCsv(r.name)}");
        }
        return csv.ToString();
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