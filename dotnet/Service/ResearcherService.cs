using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class ResearcherService(AppDbContext context)
{
    public async Task<(List<Researcher> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var query = context.researcher.AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter))
        {
            query = query.Where(r => r.name.Contains(filter));
        }

        // Sorting
        query = sortBy.ToLower() switch
        {
            "name" => ascending ? query.OrderBy(r => r.name) : query.OrderByDescending(r => r.name),
            "created_at" => ascending ? query.OrderBy(r => r.created_at) : query.OrderByDescending(r => r.created_at),
            _ => ascending ? query.OrderBy(r => r.id) : query.OrderByDescending(r => r.id)
        };

        var totalCount = await query.CountAsync();

        var researchers = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (researchers, totalCount);
    }

    public async Task<Researcher?> GetResearcherByIdAsync(int id)
    {
        return await context.researcher.FindAsync(id);
    }

    public async Task<Researcher> AddResearcherAsync(Researcher researcher)
    {
        researcher.created_at = DateTime.UtcNow;
        context.researcher.Add(researcher);
        await context.SaveChangesAsync();
        return researcher;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher updatedResearcher)
    {
        var existing = await context.researcher.FindAsync(id);
        if (existing == null)
            return false;

        existing.name = updatedResearcher.name;
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        var existing = await context.researcher.FindAsync(id);
        if (existing == null)
            return false;

        context.researcher.Remove(existing);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<string> ExportResearchersAsCsvAsync()
    {
        var researchers = await context.researcher.ToListAsync();
        var csv = "Id,CreatedAt,Name\n";
        foreach (var researcher in researchers)
        {
            csv += $"{researcher.id},{researcher.created_at:O},{EscapeCsv(researcher.name)}\n";
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