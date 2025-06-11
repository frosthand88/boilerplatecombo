package database

import (
	"fmt"
	"github.com/gocql/gocql"
	"log"
	"strings"
)

type CassandraConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	Keyspace string
}

func ParseCassandraDsn(dsn string) (*CassandraConfig, error) {
	configMap := make(map[string]string)
	pairs := strings.Split(dsn, ";")
	for _, pair := range pairs {
		kv := strings.SplitN(pair, "=", 2)
		if len(kv) == 2 {
			key := strings.TrimSpace(kv[0])
			value := strings.TrimSpace(kv[1])
			configMap[key] = value
		}
	}

	port := 9042 // default
	fmt.Sscanf(configMap["port"], "%d", &port)

	return &CassandraConfig{
		Host:     configMap["host"],
		Port:     port,
		Username: configMap["username"],
		Password: configMap["password"],
		Keyspace: configMap["keyspace"],
	}, nil
}

func NewCassandraDB(dsn string) (*gocql.ClusterConfig, error) {
	log.Print(dsn)

	cfg, err := ParseCassandraDsn(dsn)
	if err != nil {
		return nil, err
	}

	cluster := gocql.NewCluster(cfg.Host)
	cluster.Port = cfg.Port
	cluster.Authenticator = gocql.PasswordAuthenticator{
		Username: cfg.Username,
		Password: cfg.Password,
	}
	cluster.Consistency = gocql.Quorum
	cluster.Keyspace = cfg.Keyspace

	return cluster, nil
}
