package database

import (
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
	"log"
	"net/url"
)

func NewNeoDB(dsn string) (neo4j.DriverWithContext, error) {
	log.Print(dsn)
	u, err := url.Parse(dsn)
	if err != nil {
		log.Fatalf("Invalid DSN: %v", err)
	}

	// Extract credentials
	user := u.User.Username()
	password, _ := u.User.Password()

	// Remove credentials from URI before passing to driver
	u.User = nil
	sanitizedUri := u.String()

	driver, err := neo4j.NewDriverWithContext(sanitizedUri, neo4j.BasicAuth(user, password, ""))
	if err != nil {
		panic(err)
	}

	return driver, nil
}
