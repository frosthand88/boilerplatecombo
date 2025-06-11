package service

import (
	"errors"
	"strings"

	"frosthand.com/boilerplate-golang/models"
	"gorm.io/gorm"
)

type TimescaleService struct {
	db *gorm.DB
}

func NewTimescaleService(db *gorm.DB) *TimescaleService {
	return &TimescaleService{db: db}
}

func (s *TimescaleService) GetResearchers(pageNumber, pageSize int, name, sortBy string) ([]models.ResearchActivity, error) {
	if pageNumber <= 0 {
		pageNumber = 1
	}
	if pageSize <= 0 {
		pageSize = 10
	}

	var researchers []models.ResearchActivity
	query := s.db.Model(&models.ResearchActivity{})

	if name != "" {
		likePattern := "%" + strings.ReplaceAll(name, "%", "\\%") + "%"
		query = query.Where("researcher LIKE ?", likePattern)
	}

	// Validate sortBy input to prevent SQL injection - allow only certain fields and directions
	allowedSorts := map[string]bool{
		"researcher asc":  true,
		"researcher desc": true,
	}
	if sortBy == "" {
		sortBy = "researcher asc"
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
