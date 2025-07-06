// See https://aka.ms/new-console-template for more information

using Amazon.DynamoDBv2;
using BoilerplateCombo;
using BoilerplateCombo.Models;
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

var secrets = await SecretsManagerHelper.GetSecretsAsync("MyAppSecret");

builder.Configuration.AddInMemoryCollection(secrets!);

// Add DbContext
builder.Services.AddDbContext<CockroachDbContext>(options =>
    options.UseNpgsql(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("cockroachdb"), secrets["cockroachdb"])));
builder.Services.AddDbContext<MariaDbContext>(options =>
    options.UseMySQL(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("mariadb"), secrets["mariadb"])));
builder.Services.AddDbContext<SqlServerDbContext>(options =>
    options.UseSqlServer(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("mssql"), secrets["mssql"])));
builder.Services.AddDbContext<MySqlDbContext>(options =>
    options.UseMySQL(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("mysql"), secrets["mysql"])));
builder.Services.AddDbContext<OracleDbContext>(options =>
    options.UseOracle(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("oracle"), secrets["oracle"])));
builder.Services.AddDbContext<PostgresDbContext>(options =>
    options.UseNpgsql(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("postgresql"), secrets["postgresql"])));
builder.Services.AddDbContext<TimescaleDbContext>(options =>
    options.UseNpgsql(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("timescaledb"), secrets["timescaledb"])));
// builder.Services.AddDbContext<SnowflakeDbContext>(options =>
//     options.UseSnowflake(builder.Configuration.GetConnectionString("Snowflake")));

// Add Services
builder.Services.AddScoped<DuckDBConnection>(c => new DuckDBConnection(SecretsManagerHelper.InjectPassword(builder.Configuration.GetConnectionString("duckdb"), secrets["duckdb"])));
builder.Services.AddScoped<Cluster>(c => Cluster.Builder()
    .AddContactPoint("host.docker.internal")
    .WithPort(9042)
    .Build());
builder.Services.AddScoped<ElasticClient>(sp =>
{
    var uri = new Uri(builder.Configuration.GetConnectionString("elasticsearch"));

    var username = "elastic";
    var password = secrets["elasticsearch"];

    var settings = new ConnectionSettings(uri)
        .BasicAuthentication(username, password)
        .DefaultIndex("researchers");

    return new ElasticClient(settings);
});
builder.Services.AddScoped<AmazonDynamoDBClient>();
builder.Services.AddScoped<InfluxDBClient>(c => new InfluxDBClient(InfluxDBClientOptions.Builder.CreateNew().Url(builder.Configuration.GetConnectionString("influxdb")).AuthenticateToken(secrets["influxdb"]).Build()));
var mongoUrilBuilder = new MongoUrlBuilder(builder.Configuration.GetConnectionString("mongodb"))
{
    Username = "frosthand_mongodb_user",
    Password = secrets["mongodb"] // inject the password programmatically
};
builder.Services.AddScoped<MongoClient>(c => new MongoClient(mongoUrilBuilder.ToMongoUrl()));
builder.Services.AddScoped<IDriver>(c => GraphDatabase.Driver(builder.Configuration.GetConnectionString("neo4j"), AuthTokens.Basic("neo4j", secrets["neo4j"])));
builder.Services.AddScoped<ConnectionMultiplexer>(c => ConnectionMultiplexer.Connect(string.Concat(builder.Configuration.GetConnectionString("redis"), $",password={secrets["redis"]}")));

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

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://auth.frosthand.com/realms/frosthand";
        options.Audience = "frosthand-dotnet-backend"; // match Keycloak client ID
        options.RequireHttpsMetadata = false; // only for dev
    });

builder.Services.AddAuthorization();

builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

// Enable CORS
app.UseCors("AllowAll");

app.UseRouting();

// Middleware
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseWebSockets();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();