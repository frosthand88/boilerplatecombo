package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	PostgresDSN string
	MySQLDSN    string
	MSSQLDSN    string
	OracleDSN   string
}

func LoadConfig() (Config, error) {
	viper.SetConfigFile("config.yaml")
	err := viper.ReadInConfig()
	if err != nil {
		return Config{}, err
	}

	cfg := Config{
		PostgresDSN: viper.GetString("databases.postgres"),
		MySQLDSN:    viper.GetString("databases.mysql"),
		MSSQLDSN:    viper.GetString("databases.mssql"),
		OracleDSN:   viper.GetString("databases.oracle"),
	}
	return cfg, nil
}
