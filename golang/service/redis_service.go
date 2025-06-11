package service

import (
	"context"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"strings"

	"frosthand.com/boilerplate-golang/models"
	"github.com/redis/go-redis/v9"
)

type RedisService struct {
	client *redis.Client
}

func NewRedisService(client *redis.Client) *RedisService {
	return &RedisService{client: client}
}

func (s *RedisService) AddResearcher(ctx context.Context, r models.Researcher) error {
	key := fmt.Sprintf("researcher:%d", r.Id)
	_, err := s.client.HSet(ctx, key, map[string]interface{}{
		"name": r.Name,
		"age":  r.Age,
	}).Result()
	return err
}

func (s *RedisService) GetResearcherByID(ctx context.Context, id uint) (*models.Researcher, error) {
	key := fmt.Sprintf("researcher:%d", id)
	vals, err := s.client.HGetAll(ctx, key).Result()
	if err != nil || len(vals) == 0 {
		return nil, err
	}
	age, _ := strconv.Atoi(vals["age"])
	return &models.Researcher{
		Id:   id,
		Name: vals["name"],
		Age:  age,
	}, nil
}

func (s *RedisService) UpdateResearcher(ctx context.Context, id int, r models.Researcher) error {
	return s.AddResearcher(ctx, r)
}

func (s *RedisService) DeleteResearcher(ctx context.Context, id int) error {
	key := fmt.Sprintf("researcher:%d", id)
	_, err := s.client.Del(ctx, key).Result()
	return err
}

func (s *RedisService) ExportResearchersAsCSV(ctx context.Context, ids []uint, filename string) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	writer.Write([]string{"Id", "Name", "Age"})

	for _, id := range ids {
		r, err := s.GetResearcherByID(ctx, id)
		if err == nil && r != nil {
			writer.Write([]string{
				strconv.Itoa(int(r.Id)),
				escapeCsv(r.Name),
				strconv.Itoa(r.Age),
			})
		}
	}
	return nil
}

func escapeCsv(value string) string {
	if strings.ContainsAny(value, ",\"\n") {
		value = strings.ReplaceAll(value, `"`, `""`)
		return `"` + value + `"`
	}
	return value
}
