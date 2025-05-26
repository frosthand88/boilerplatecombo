// See https://aka.ms/new-console-template for more information

using Amazon.DynamoDBv2;
using BoilerplateCombo.Repository;
using BoilerplateCombo.Service;
using Cassandra;
using DuckDB.NET.Data;
using InfluxDB.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Neo4j.Driver;
using Nest;
using StackExchange.Redis;

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
builder.Services.AddDbContext<MariaDbContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("Maria")));
builder.Services.AddDbContext<CockroachDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Cockroach")));
builder.Services.AddDbContext<TimescaleDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Timescale")));
// builder.Services.AddDbContext<SnowflakeDbContext>(options =>
//     options.UseSnowflake(builder.Configuration.GetConnectionString("Snowflake")));

// Add Services
builder.Services.AddScoped<DuckDBConnection>(c => new DuckDBConnection(builder.Configuration.GetConnectionString("Duck")));
builder.Services.AddScoped<Cluster>(c => Cluster.Builder()
    .AddContactPoint("host.docker.internal")
    .WithPort(9042)
    .Build());
builder.Services.AddScoped<ElasticClient>(c => new ElasticClient(new ConnectionSettings(new Uri(builder.Configuration.GetConnectionString("Elasticsearch")))
    .DefaultIndex("researchers")));
builder.Services.AddScoped<AmazonDynamoDBClient>();
builder.Services.AddScoped<InfluxDBClient>(c => InfluxDBClientFactory.Create(builder.Configuration.GetConnectionString("Influx"), "token"));
builder.Services.AddScoped<MongoClient>(c => new MongoClient(builder.Configuration.GetConnectionString("Mongo")));
builder.Services.AddScoped<IDriver>(c => GraphDatabase.Driver(builder.Configuration.GetConnectionString("Neo"), AuthTokens.Basic("neo4j", "strongpassword123")));
builder.Services.AddScoped<ConnectionMultiplexer>(c => ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")));

builder.Services.AddScoped<PostgresResearcherService>();
builder.Services.AddScoped<SqlServerResearcherService>();
builder.Services.AddScoped<MySqlResearcherService>();
builder.Services.AddScoped<OracleResearcherService>();
builder.Services.AddScoped<CassandraResearcherService>();
builder.Services.AddScoped<MariaResearcherService>();
builder.Services.AddScoped<CockroachResearcherService>();
builder.Services.AddScoped<SnowflakeResearcherService>();
builder.Services.AddScoped<DuckResearcherService>();
builder.Services.AddScoped<DynamoResearcherService>();
builder.Services.AddScoped<InfluxResearcherService>();
builder.Services.AddScoped<TimescaleResearcherService>();
builder.Services.AddScoped<ElasticSearchResearcherService>();
builder.Services.AddScoped<MongoResearcherService>();
builder.Services.AddScoped<NeoResearcherService>();
builder.Services.AddScoped<RedisResearcherService>();

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