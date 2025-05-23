package database

import (
	"database/sql"
	"fmt"

	"frosthand.com/boilerplate-golang/models"
	//_ "github.com/godror/godror" // CURRENTLY SIMPLY UNWORKABLE DUE TO NON-NATIVE ORACLE SUPPORT FOR GO
)

type OracleRepository struct {
	db *sql.DB
}

// Initialize Oracle DB connection
func NewOracleDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("godror", dsn)
	if err != nil {
		return nil, fmt.Errorf("sql.Open failed: %w", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("db.Ping failed: %w", err)
	}
	return db, nil
}

// Create repository instance using the DB
func NewOracleRepository(db *sql.DB) *OracleRepository {
	return &OracleRepository{db: db}
}

// Query all researchers
func (r *OracleRepository) GetResearchers(pageNumber, pageSize int, nameFilter, sortBy string) ([]models.Researcher2, error) {
	// Default sort
	validSorts := map[string]string{
		"id":         "ID",
		"name":       "NAME",
		"created_at": "CREATED_AT",
	}
	sortColumn, ok := validSorts[sortBy]
	if !ok {
		sortColumn = "ID"
	}

	offset := (pageNumber - 1) * pageSize

	query := `
		SELECT ID, NAME, CREATED_AT
		FROM researcher
		WHERE (:1 IS NULL OR LOWER(NAME) LIKE LOWER(:2))
		ORDER BY ` + sortColumn + `
		OFFSET :3 ROWS FETCH NEXT :4 ROWS ONLY`

	rows, err := r.db.Query(query, nameFilter, "%"+nameFilter+"%", offset, pageSize)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []models.Researcher2
	for rows.Next() {
		var rec models.Researcher2
		if err := rows.Scan(&rec.Id, &rec.Name, &rec.CreatedAt); err != nil {
			return nil, err
		}
		list = append(list, rec)
	}
	return list, nil
}
