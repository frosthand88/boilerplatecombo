﻿using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace BoilerplateCombo.Service;

public class RedisResearcherService(ConnectionMultiplexer redis)
{
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var db = redis.GetDatabase();
        var content = await db.HashGetAllAsync("researcher:1");
        Console.WriteLine($"Content: {JsonConvert.SerializeObject(content)}");
        return new();
    }

    public async Task<Researcher2?> GetResearcherByIdAsync(int id)
    {
        //return await context.researcher.FindAsync(id);
        return null;
    }

    public async Task<Researcher2> AddResearcherAsync(Researcher2 researcher)
    {
        var db = redis.GetDatabase();
        await db.StringSetAsync("researcher:1:name", "Alice");
        return null;
    }

    public async Task<bool> UpdateResearcherAsync(int id, Researcher2 updatedResearcher)
    {
        var db = redis.GetDatabase();
        await db.StringSetAsync("researcher:1:age", 30);
        return true;
    }

    public async Task<bool> DeleteResearcherAsync(int id)
    {
        var db = redis.GetDatabase();
        await db.KeyDeleteAsync("researcher:1:name");
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