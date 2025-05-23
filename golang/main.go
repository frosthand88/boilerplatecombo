// @title Researcher API
// @version 1.0
// @description API for researchers with multi-DB support
// @host localhost:8080
// @BasePath /
package main

import (
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
	// Load config
	cfg, err := config.LoadConfig()
	log.Print(cfg)
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

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

	// Create services
	pgService := service.NewPostgresService(pgDB)
	mysqlService := service.NewMysqlService(mysqlDB)
	mssqlService := service.NewMssqlService(mssqlDB)
	//oracleRepo := database.NewOracleRepository(oracleDB)
	//oracleService := service.NewOracleService(oracleRepo)

	// Create controllers
	pgCtrl := controllers.NewPostgresController(pgService)
	mysqlCtrl := controllers.NewMysqlController(mysqlService)
	mssqlCtrl := controllers.NewMssqlController(mssqlService)
	//oracleCtrl := controllers.NewOracleController(oracleService)

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
		swaggerHost = "localhost:8080" // fallback if not set
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

	// Start server
	log.Println("Starting server at :8080")
	if err := r.Run("0.0.0.0:8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
