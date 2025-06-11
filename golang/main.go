// @title Researcher API
// @version 1.0
// @description API for researchers with multi-DB support
// @host localhost:28080
// @BasePath /
package main

import (
	"context"
	"log"
	"os"
	"time"

	"frosthand.com/boilerplate-golang/config"
	"frosthand.com/boilerplate-golang/controllers"
	"frosthand.com/boilerplate-golang/database"
	"frosthand.com/boilerplate-golang/docs"
	"frosthand.com/boilerplate-golang/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	// Swagger
	_ "frosthand.com/boilerplate-golang/docs" // swagger generated docs import
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	ctx := context.Background()

	roleArn := "arn:aws:iam::022499021574:role/fh-read-secret-role"
	secretName := "MyAppSecret"

	// Load secrets from AWS and inject into config
	err := config.LoadAndInjectSecrets(ctx, roleArn, secretName)
	if err != nil {
		log.Fatalf("Failed to inject secrets: %v", err)
	}

	// Load config
	cfg, err := config.LoadConfig()
	log.Print(cfg)
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	log.Printf("Postgres DSN: %v", cfg.PostgresDSN)

	// Connect databases
	pgDB, err := database.NewPostgresDB(cfg.PostgresDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Postgres: %v", err)
	}
	mysqlDB, err := database.NewMysqlDB(cfg.MySQLDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Mysql: %v", err)
	}
	mssqlDB, err := database.NewMssqlDB(cfg.MSSQLDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Mssql: %v", err)
	}
	//oracleDB, err := database.NewOracleDB(cfg.OracleDSN)
	//if err != nil {
	//	log.Fatalf("Failed to connect to Oracle: %v", err)
	//}
	timescaleDB, err := database.NewTimescaleDB(cfg.TimescaleDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Timescale: %v", err)
	}
	cockroachDB, err := database.NewCockroachDB(cfg.CockroachDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Cockroach: %v", err)
	}
	mariaDB, err := database.NewMariaDB(cfg.MariaDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Maria: %v", err)
	}
	//duckDB, err := database.NewDuckDB(cfg.DuckDSN)
	//if err != nil {
	//	log.Fatalf("Failed to connect to Maria: %v", err)
	//}
	redisDB, err := database.NewRedisDB(cfg.RedisDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
	mongoDB, err := database.NewMongoDB(cfg.MongoDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Mongo: %v", err)
	}
	cassandraDB, err := database.NewCassandraDB(cfg.CassandraDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Cassandra: %v", err)
	}
	neoDB, err := database.NewNeoDB(cfg.NeoDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Neo4j: %v", err)
	}
	influxDB, err := database.NewInfluxDB(cfg.InfluxDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Influxdb: %v", err)
	}
	elasticDB, err := database.NewElasticDB(cfg.ElasticDSN)
	if err != nil {
		log.Fatalf("Failed to connect to Elasticsearch: %v", err)
	}

	// Create services
	pgService := service.NewPostgresService(pgDB)
	mysqlService := service.NewMysqlService(mysqlDB)
	mssqlService := service.NewMssqlService(mssqlDB)
	//oracleRepo := database.NewOracleRepository(oracleDB)
	//oracleService := service.NewOracleService(oracleRepo)
	timescaleService := service.NewTimescaleService(timescaleDB)
	cockroachService := service.NewCockroachService(cockroachDB)
	mariaService := service.NewMariaService(mariaDB)
	//duckService := service.NewDuckService(duckDB)
	redisService := service.NewRedisService(redisDB)
	mongoService := service.NewMongoService(mongoDB)
	cassandraService := service.NewCassandraService(cassandraDB)
	neoService := service.NewNeoService(neoDB)
	influxService := service.NewInfluxService(influxDB)
	elasticService := service.NewElasticService(elasticDB)

	// Create controllers
	pgCtrl := controllers.NewPostgresController(pgService)
	mysqlCtrl := controllers.NewMysqlController(mysqlService)
	mssqlCtrl := controllers.NewMssqlController(mssqlService)
	//oracleCtrl := controllers.NewOracleController(oracleService)
	timescaleCtrl := controllers.NewTimescaleController(timescaleService)
	cockroachCtrl := controllers.NewCockroachController(cockroachService)
	mariaCtrl := controllers.NewMariaController(mariaService)
	//duckCtrl := controllers.NewDuckController(duckService)
	redisCtrl := controllers.NewRedisController(redisService)
	mongoCtrl := controllers.NewMongoController(mongoService)
	cassandraCtrl := controllers.NewCassandraController(cassandraService)
	neoCtrl := controllers.NewNeoController(neoService)
	influxCtrl := controllers.NewInfluxController(influxService)
	elasticCtrl := controllers.NewElasticController(elasticService)

	r := gin.Default()

	// CORS - allow all origins
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// ✅ --- DYNAMIC SWAGGER HOST DETECTION ---
	swaggerHost := os.Getenv("SWAGGER_HOST")
	if swaggerHost == "" {
		swaggerHost = "localhost:28080" // fallback if not set
	}
	docs.SwaggerInfo.Host = swaggerHost
	swaggerURL := ginSwagger.URL("http://" + swaggerHost + "/swagger/doc.json")

	// ✅ Swagger route with override URL
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, swaggerURL))

	// Routes for each DB controller
	r.GET("/postgres/researchers", pgCtrl.GetResearchers)
	r.GET("/mysql/researchers", mysqlCtrl.GetResearchers)
	r.GET("/mssql/researchers", mssqlCtrl.GetResearchers)
	//r.GET("/oracle/researchers", oracleCtrl.GetResearchers)
	r.GET("/timescale/researchers", timescaleCtrl.GetResearchers)
	r.GET("/cockroach/researchers", cockroachCtrl.GetResearchers)
	r.GET("/maria/researchers", mariaCtrl.GetResearchers)
	//r.GET("/duck/researchers", duckCtrl.GetResearchers)
	r.GET("/redis/researchers", redisCtrl.GetResearchers)
	r.GET("/mongo/researchers", mongoCtrl.GetResearchers)
	r.GET("/cassandra/researchers", cassandraCtrl.GetResearchers)
	r.GET("/neo/researchers", neoCtrl.GetResearchers)
	r.GET("/influx/researchers", influxCtrl.GetResearchers)
	r.GET("/elastic/researchers", elasticCtrl.GetResearchers)

	// Start server
	log.Println("Starting server at :28080")
	if err := r.Run("0.0.0.0:28080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
