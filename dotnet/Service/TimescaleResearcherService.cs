using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class TimescaleResearcherService(TimescaleDbContext context)
{
    public async Task<(List<ResearchActivity> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var query = context.research_activity.AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter))
        {
            query = query.Where(r => r.researcher.Contains(filter));
        }

        // Sorting
        query = sortBy.ToLower() switch
        {
            "name" => ascending ? query.OrderBy(r => r.researcher) : query.OrderByDescending(r => r.researcher),
            "created_at" => ascending ? query.OrderBy(r => r.time) : query.OrderByDescending(r => r.time),
            _ => ascending ? query.OrderBy(r => r.researcher) : query.OrderByDescending(r => r.researcher)
        };

        var totalCount = await query.CountAsync();

        var researchers = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (researchers, totalCount);
    }

    public async Task<ResearchActivity?> GetResearcherByIdAsync(int id)
    {
        return await context.research_activity.FindAsync(id);
    }

    public async Task<ResearchActivity> AddResearcherAsync(ResearchActivity researcher)
    {
        researcher.time = DateTime.UtcNow;
        context.research_activity.Add(researcher);
        await context.SaveChangesAsync();
        return researcher;
    }

    public async Task<bool> UpdateResearcherAsync(int id, ResearchActivity updatedResearcher)
    {
        var existing = await context.research_activity.FindAsync(id);
        if (existing == null)
            return false;

        existing.researcher = updatedResearcher.researcher;
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        var existing = await context.research_activity.FindAsync(id);
        if (existing == null)
            return false;

        context.research_activity.Remove(existing);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<string> ExportResearchersAsCsvAsync()
    {
        var researchers = await context.research_activity.ToListAsync();
        var csv = "Researcher,CreatedAt,Paper\n";
        foreach (var researcher in researchers)
        {
            csv += $"{researcher.researcher},{researcher.time:O},{EscapeCsv(researcher.paper)}\n";
        }
        return csv;
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