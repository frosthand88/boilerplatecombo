using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class TimescaleDbContext(DbContextOptions<TimescaleDbContext> options) : DbContext(options)
{
    public DbSet<ResearchActivity> research_activity { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ResearchActivity>().HasNoKey();
    }
}