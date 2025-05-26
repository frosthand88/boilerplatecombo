using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class TimescaleDbContext(DbContextOptions<TimescaleDbContext> options) : DbContext(options)
{
    public DbSet<Researcher2> researcher { get; set; }
}