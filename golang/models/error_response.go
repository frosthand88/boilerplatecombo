package models

// ErrorResponse represents a generic error message returned by the API
type ErrorResponse struct {
	Error string `json:"error"`
}
