package models

import (
	"time"
)

type Researcher struct {
	Id        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	Age       int       `json:"age"`
}

func (Researcher) TableName() string {
	return "researcher" // or whatever your exact table name is
}
