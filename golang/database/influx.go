package database

import (
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"log"
	"net/url"
)

type InfluxConfig struct {
	URL   string
	Token string
}

func ParseInfluxDsn(dsn string) (InfluxConfig, error) {
	parsedUrl, err := url.Parse(dsn)
	if err != nil {
		log.Fatalf("Invalid influxdb connection string: %v", err)
	}

	q := parsedUrl.Query()
	return InfluxConfig{
		URL:   parsedUrl.Scheme + "://" + parsedUrl.Host,
		Token: q.Get("token"),
	}, err
}

func NewInfluxDB(dsn string) (influxdb2.Client, error) {
	log.Print(dsn)
	cfg, err := ParseInfluxDsn(dsn)
	client := influxdb2.NewClient(cfg.URL, cfg.Token)
	if err != nil {
		panic(err)
	}

	return client, nil
}
