package models

import (
	"time"
)

type ResearchActivity struct {
	//Id           uint      `gorm:"primaryKey" json:"id"`
	Time         time.Time `json:"time"`
	Researcher   string    `json:"researcher"`
	Paper        string    `json:"paper"`
	Topic        string    `json:"topic"`
	Conference   string    `json:"conference"`
	Organization string    `json:"organization"`
	Citations    int       `json:"citations"`
}

func (ResearchActivity) TableName() string {
	return "research_activity" // or whatever your exact table name is
}
