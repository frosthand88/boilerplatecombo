package models

import (
	"time"
)

type Researcher2 struct {
	Id        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}

func (Researcher2) TableName() string {
	return "researcher" // or whatever your exact table name is
}
