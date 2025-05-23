package service

import (
	"frosthand.com/boilerplate-golang/database"
	"frosthand.com/boilerplate-golang/models"
)

type OracleService struct {
	repo *database.OracleRepository
}

func NewOracleService(repo *database.OracleRepository) *OracleService {
	return &OracleService{repo: repo}
}

func (s *OracleService) GetResearchers(pageNumber, pageSize int, nameFilter, sortBy string) ([]models.Researcher2, error) {
	return s.repo.GetResearchers(pageNumber, pageSize, nameFilter, sortBy)
}
