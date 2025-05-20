using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class OracleDbContext(DbContextOptions<OracleDbContext> options) : DbContext(options)
{
    public DbSet<Researcher2> researcher { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Workaround due to Oracle uppercase naming & system table
        modelBuilder.Entity<Researcher2>(entity =>
        {
            entity.ToTable("RESEARCHER", schema: "SYSTEM");
            
            entity.HasKey(e => e.id);

            entity.Property(e => e.id).HasColumnName("ID");
            entity.Property(e => e.created_at).HasColumnName("CREATED_AT");
            entity.Property(e => e.name).HasColumnName("NAME");
        });
    }
}