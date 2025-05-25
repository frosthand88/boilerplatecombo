using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class CockroachDbContext(DbContextOptions<CockroachDbContext> options) : DbContext(options)
{
    public DbSet<Researcher2> researcher { get; set; }
}