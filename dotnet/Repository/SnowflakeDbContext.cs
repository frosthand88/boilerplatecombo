using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class SnowflakeDbContext(DbContextOptions<SnowflakeDbContext> options) : DbContext(options)
{
    public DbSet<Researcher2> researcher { get; set; }
}