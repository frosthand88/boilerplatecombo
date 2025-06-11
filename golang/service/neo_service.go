package service

import (
	"context"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
	"log"
)

type NeoService struct {
	driver neo4j.DriverWithContext
}

func NewNeoService(client neo4j.DriverWithContext) *NeoService {
	return &NeoService{driver: client}
}

func (s *NeoService) GetResearchers(page, pageSize int, name, sortBy string) ([]map[string]interface{}, error) {
	ctx := context.Background()
	skip := (page - 1) * pageSize
	limit := pageSize

	session := s.driver.NewSession(ctx, neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close(ctx)

	// Run query
	query := `
		MATCH (city:City)-[:IN_COUNTRY]->(country:Country)
		RETURN city, country
		ORDER BY city.name ASC
		SKIP $skip
		LIMIT $limit
	`
	result, err := session.Run(ctx, query, map[string]interface{}{
		"skip":  skip,
		"limit": limit,
	})
	if err != nil {
		log.Printf("Neo4j query error: %v", err)
		return nil, err
	}

	// Format response
	var cities []map[string]interface{}
	for result.Next(ctx) {
		record := result.Record()
		values := record.Values
		city := values[0].(neo4j.Node)
		country := values[1].(neo4j.Node)

		cities = append(cities, map[string]interface{}{
			"city_name": city.Props["name"],
			"population": func() interface{} {
				if pop, ok := city.Props["population"]; ok {
					return pop
				}
				return 0
			}(),
			"country": map[string]interface{}{
				"code":      country.Props["code"],
				"name":      country.Props["name"],
				"continent": country.Props["continent"],
			},
		})
	}

	return cities, nil
}
