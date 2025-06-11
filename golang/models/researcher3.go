package models

import (
	"time"

	"github.com/gocql/gocql"
)

type Researcher3 struct {
	Id        gocql.UUID // ✅ Correct type
	Name      string
	CreatedAt time.Time
	Age       int
}
