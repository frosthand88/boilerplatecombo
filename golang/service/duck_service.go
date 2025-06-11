package service

//import (
//	"database/sql"
//	"fmt"
//	"frosthand.com/boilerplate-golang/models"
//	"log"
//)

//type DuckService struct {
//	db *sql.DB
//}

//func NewDuckService(db *sql.DB) *DuckService {
//	return &DuckService{db: db}
//}

//func (s *DuckService) GetResearchers(limit int) ([]ResearchActivity, error) {
//	rows, err := s.db.Query("SELECT * FROM research_activity LIMIT ?", limit)
//	if err != nil {
//		return nil, err
//	}
//	defer rows.Close()
//
//	var researchers []ResearchActivity
//	for rows.Next() {
//		var r ResearchActivity
//		err := rows.Scan(&r.ID, &r.Name, &r.CreatedAt)
//		if err != nil {
//			return nil, err
//		}
//		researchers = append(researchers, r)
//	}
//	return researchers, nil
//}
