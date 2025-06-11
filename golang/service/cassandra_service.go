package service

import (
	"frosthand.com/boilerplate-golang/models"
	"github.com/gocql/gocql"
)

type CassandraService struct {
	Cluster *gocql.ClusterConfig
}

func NewCassandraService(cluster *gocql.ClusterConfig) *CassandraService {
	return &CassandraService{Cluster: cluster}
}

func (cs *CassandraService) GetResearchers() ([]models.Researcher3, error) {
	var researchers []models.Researcher3

	session, err := cs.Cluster.CreateSession()
	if err != nil {
		return nil, err
	}

	query := "SELECT researcher_id, name, created_at, age FROM researchers"
	iter := session.Query(query).Iter()

	var r models.Researcher3
	for iter.Scan(&r.Id, &r.Name, &r.CreatedAt, &r.Age) {
		researchers = append(researchers, r)
	}

	if err := iter.Close(); err != nil {
		return nil, err
	}

	session.Close()

	return researchers, nil
}
