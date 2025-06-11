package database

import (
	"fmt"
	"github.com/redis/go-redis/v9"
	"log"
	"strings"
)

type RedisConfig struct {
	Addr     string
	Password string
}

func ParseRedisDsn(dsn string) (*RedisConfig, error) {
	parts := strings.Split(dsn, ",")
	if len(parts) == 0 {
		return nil, fmt.Errorf("invalid Redis DSN")
	}

	addr := parts[0]
	password := ""

	for _, part := range parts[1:] {
		if strings.HasPrefix(part, "password=") {
			password = strings.TrimPrefix(part, "password=")
		}
	}

	return &RedisConfig{
		Addr:     addr,
		Password: password,
	}, nil
}

func NewRedisDB(dsn string) (*redis.Client, error) {
	log.Print(dsn)
	redisConf, err := ParseRedisDsn(dsn)
	if err != nil {
		panic(err)
	}
	client := redis.NewClient(&redis.Options{
		Addr:     redisConf.Addr,
		Password: redisConf.Password,
		DB:       0,
	})

	return client, nil
}
