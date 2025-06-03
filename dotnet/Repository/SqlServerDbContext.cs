using BoilerplateCombo.Models;
using Microsoft.EntityFrameworkCore;

namespace BoilerplateCombo.Repository;

public class SqlServerDbContext(DbContextOptions<SqlServerDbContext> options) : DbContext(options)
{
    public DbSet<ResearcherMsSql> researcher { get; set; }
}