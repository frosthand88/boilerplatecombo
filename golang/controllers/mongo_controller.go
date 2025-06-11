package controllers

import (
	"net/http"

	"frosthand.com/boilerplate-golang/service"
	"github.com/gin-gonic/gin"
)

type MongoController struct {
	service *service.MongoService
}

func NewMongoController(service *service.MongoService) *MongoController {
	return &MongoController{service: service}
}

// GetResearchers godoc
// @Summary Get a list of researchers
// @Description Get researchers with pagination, filter, and sorting
// @Tags researchers
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Researcher
// @Failure 400 {object} models.ErrorResponse
// @Router /mongo/researchers [get]
func (c *MongoController) GetResearchers(ctx *gin.Context) {
	results, err := c.service.GetResearchers(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, results)
}
