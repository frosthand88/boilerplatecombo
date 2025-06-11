package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	PostgresDSN  string
	MySQLDSN     string
	MSSQLDSN     string
	OracleDSN    string
	TimescaleDSN string
	CockroachDSN string
	MariaDSN     string
	DuckDSN      string
	RedisDSN     string
	MongoDSN     string
	CassandraDSN string
	NeoDSN       string
	InfluxDSN    string
	ElasticDSN   string
}

func LoadConfig() (Config, error) {
	viper.SetConfigFile("config.patched.yaml") // <--- FIXED LINE
	err := viper.ReadInConfig()
	if err != nil {
		return Config{}, err
	}

	fmt.Println("[DEBUG] Config loaded from:", viper.ConfigFileUsed())
	fmt.Printf("[DEBUG] databases.postgresql = '%s'\n", viper.GetString("databases.postgresql"))

	cfg := Config{
		PostgresDSN:  viper.GetString("databases.postgresql"),
		MySQLDSN:     viper.GetString("databases.mysql"),
		MSSQLDSN:     viper.GetString("databases.mssql"),
		OracleDSN:    viper.GetString("databases.oracle"),
		TimescaleDSN: viper.GetString("databases.timescaledb"),
		CockroachDSN: viper.GetString("databases.cockroachdb"),
		MariaDSN:     viper.GetString("databases.mariadb"),
		DuckDSN:      viper.GetString("databases.duckdb"),
		RedisDSN:     viper.GetString("databases.redis"),
		MongoDSN:     viper.GetString("databases.mongodb"),
		CassandraDSN: viper.GetString("databases.cassandra"),
		NeoDSN:       viper.GetString("databases.neo4j"),
		InfluxDSN:    viper.GetString("databases.influxdb"),
		ElasticDSN:   viper.GetString("databases.elasticsearch"),
	}
	return cfg, nil
}
