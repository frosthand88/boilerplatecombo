// See https://aka.ms/new-console-template for more information

using BoilerplateCombo.Repository;
using BoilerplateCombo.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<PostgresDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Postgres")));
builder.Services.AddDbContext<SqlServerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));
builder.Services.AddDbContext<MySqlDbContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("MySql")));
builder.Services.AddDbContext<OracleDbContext>(options =>
    options.UseOracle(builder.Configuration.GetConnectionString("Oracle")));

// Add Services
builder.Services.AddScoped<PostgresResearcherService>();
builder.Services.AddScoped<SqlServerResearcherService>();
builder.Services.AddScoped<MySqlResearcherService>();
builder.Services.AddScoped<OracleResearcherService>();

builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

// Enable CORS
app.UseCors("AllowAll");

// Middleware
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseWebSockets();
app.UseAuthorization();
app.MapControllers();
app.Run();