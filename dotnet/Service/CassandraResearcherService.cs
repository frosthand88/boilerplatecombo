﻿using BoilerplateCombo.Models;
using BoilerplateCombo.Repository;
using Cassandra;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Service;

public class CassandraResearcherService(Cluster cluster)
{
    public async Task CreateKeyspace()
    {
        // Create Keyspace
        var session = await cluster.ConnectAsync();
        const string createKeyspace = @"
            CREATE KEYSPACE IF NOT EXISTS benchmark_keyspace
            WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}";
        await session.ExecuteAsync(new SimpleStatement(createKeyspace));
        
        // Connect to the new keyspace
        session = await cluster.ConnectAsync("benchmark_keyspace");

        // Create Tables
        var createTables = new[]
        {
            @"
            CREATE TABLE IF NOT EXISTS researchers (
                researcher_id UUID PRIMARY KEY,
                name TEXT,
                created_at TIMESTAMP,
                age INT
            )"
        };

        foreach (var query in createTables)
        {
            await session.ExecuteAsync(new SimpleStatement(query));
        }
    }
    
    public async Task<(List<Researcher2> researchers, int totalCount)> GetResearchersAsync(int page, int pageSize, string sortBy, bool ascending, string? filter)
    {
        var session = await cluster.ConnectAsync("benchmark_keyspace");
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
        var rand = new Random();

        for (int i = 0; i < 1000; i++)
        {
            var session = await cluster.ConnectAsync("benchmark_keyspace");
            var now = DateTimeOffset.UtcNow;

            await session.ExecuteAsync(new SimpleStatement(
                "INSERT INTO researchers (researcher_id, name, created_at, age) VALUES (?, ?, ?, ?)",
                Guid.NewGuid(), $"Name {rand.Next(10000)}", now.AddHours(1), rand.Next(20, 50)));
        }

        Console.WriteLine("Inserted 1000 random records.");

        Console.WriteLine("Keyspace and tables created successfully.");
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