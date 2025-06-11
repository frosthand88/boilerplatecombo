package database

import (
	"github.com/olivere/elastic/v7"
	"log"
)

func NewElasticDB(dsn string) (*elastic.Client, error) {
	log.Print(dsn)
	client, err := elastic.NewClient(
		elastic.SetURL(dsn),
		elastic.SetSniff(false))
	if err != nil {
		panic(err)
	}

	return client, nil
}
