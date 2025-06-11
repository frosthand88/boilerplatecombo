package controllers

import (
	"net/http"

	"frosthand.com/boilerplate-golang/service"
	"github.com/gin-gonic/gin"
)

type CassandraController struct {
	service *service.CassandraService
}

func NewCassandraController(service *service.CassandraService) *CassandraController {
	return &CassandraController{service: service}
}

// GetResearchers godoc
// @Summary Get a list of researchers
// @Description Get researchers with pagination, filter, and sorting
// @Tags researchers
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Researcher
// @Failure 400 {object} models.ErrorResponse
// @Router /cassandra/researchers [get]
func (c *CassandraController) GetResearchers(ctx *gin.Context) {
	results, err := c.service.GetResearchers()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, results)
}
