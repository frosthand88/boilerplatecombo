package service

import (
	"context"
	"fmt"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
)

type InfluxService struct {
	client influxdb2.Client
}

func NewInfluxService(client influxdb2.Client) *InfluxService {
	return &InfluxService{
		client: client,
	}
}

func (s *InfluxService) GetResearchers(ctx context.Context) error {
	query := fmt.Sprintf(`from(bucket:"%s") |> range(start: -2w)`, "mybucket")
	print(query)
	result, err := s.client.QueryAPI("myorg").Query(ctx, query)
	if err != nil {
		return err
	}
	for result.Next() {
		fmt.Printf("%v: %v\n", result.Record().Time(), result.Record().Value())
	}
	if result.Err() != nil {
		return result.Err()
	}
	return nil
}
