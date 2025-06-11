package service

import (
	"context"
	"encoding/json"

	"frosthand.com/boilerplate-golang/models"
	"github.com/olivere/elastic/v7"
)

type ElasticService struct {
	client *elastic.Client
}

func NewElasticService(client *elastic.Client) *ElasticService {
	return &ElasticService{client: client}
}

func (s *ElasticService) GetResearchers(ctx context.Context, page, pageSize int, filter string) ([]models.Researcher2, int64, error) {

	search := s.client.Search().
		From((page - 1) * pageSize).
		Size(pageSize)

	if filter != "" {
		search = search.Query(elastic.NewQueryStringQuery(filter))
	}

	res, err := search.Do(ctx)
	if err != nil {
		return nil, 0, err
	}

	var researchers []models.Researcher2
	for _, hit := range res.Hits.Hits {
		var r models.Researcher2
		if err := json.Unmarshal(hit.Source, &r); err != nil {
			continue
		}
		researchers = append(researchers, r)
	}

	return researchers, res.TotalHits(), nil
}
