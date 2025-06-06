package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	PostgresDSN string
	MySQLDSN    string
	MSSQLDSN    string
	OracleDSN   string
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
		PostgresDSN: viper.GetString("databases.postgresql"),
		MySQLDSN:    viper.GetString("databases.mysql"),
		MSSQLDSN:    viper.GetString("databases.mssql"),
		OracleDSN:   viper.GetString("databases.oracle"),
	}
	return cfg, nil
}
