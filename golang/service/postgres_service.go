package service

import (
	"errors"
	"strings"

	"frosthand.com/boilerplate-golang/models"
	"gorm.io/gorm"
)

type PostgresService struct {
	db *gorm.DB
}

func NewPostgresService(db *gorm.DB) *PostgresService {
	return &PostgresService{db: db}
}

func (s *PostgresService) GetResearchers(pageNumber, pageSize int, name, sortBy string) ([]models.Researcher, error) {
	if pageNumber <= 0 {
		pageNumber = 1
	}
	if pageSize <= 0 {
		pageSize = 10
	}

	var researchers []models.Researcher
	query := s.db.Model(&models.Researcher{})

	if name != "" {
		likePattern := "%" + strings.ReplaceAll(name, "%", "\\%") + "%"
		query = query.Where("name LIKE ?", likePattern)
	}

	// Validate sortBy input to prevent SQL injection - allow only certain fields and directions
	allowedSorts := map[string]bool{
		"id asc":          true,
		"id desc":         true,
		"name asc":        true,
		"name desc":       true,
		"created_at asc":  true,
		"created_at desc": true,
		"age asc":         true,
		"age desc":        true,
	}
	if sortBy == "" {
		sortBy = "id asc"
	} else {
		sortBy = strings.ToLower(sortBy)
		if !allowedSorts[sortBy] {
			return nil, errors.New("invalid sortBy parameter")
		}
	}

	err := query.Order(sortBy).
		Limit(pageSize).
		Offset((pageNumber - 1) * pageSize).
		Find(&researchers).Error

	if err != nil {
		return nil, err
	}
	return researchers, nil
}
