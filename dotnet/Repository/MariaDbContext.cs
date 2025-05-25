using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class MariaDbContext(DbContextOptions<MariaDbContext> options) : DbContext(options)
{
    public DbSet<Researcher2> researcher { get; set; }
}