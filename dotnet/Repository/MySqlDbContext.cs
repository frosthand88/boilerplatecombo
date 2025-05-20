using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class MySqlDbContext(DbContextOptions<MySqlDbContext> options) : DbContext(options)
{
    public DbSet<Researcher2> researcher { get; set; }
}