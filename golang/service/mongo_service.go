package service

import (
	"context"
	"frosthand.com/boilerplate-golang/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoService struct {
	collection *mongo.Collection
}

func NewMongoService(client *mongo.Client) *MongoService {
	col := client.Database("weather_db").Collection("current_weather")
	return &MongoService{collection: col}
}

func (s *MongoService) GetResearchers(ctx context.Context) ([]models.Researcher, error) {
	cursor, err := s.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var researchers []models.Researcher
	if err := cursor.All(ctx, &researchers); err != nil {
		return nil, err
	}

	return researchers, nil
}
