package controllers

import (
	"net/http"

	"frosthand.com/boilerplate-golang/service"
	"github.com/gin-gonic/gin"
)

type InfluxController struct {
	service *service.InfluxService
}

func NewInfluxController(service *service.InfluxService) *InfluxController {
	return &InfluxController{service: service}
}

// GetResearchers godoc
// @Summary Get a list of researchers
// @Description Get researchers with pagination, filter, and sorting
// @Tags researchers
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Researcher
// @Failure 400 {object} models.ErrorResponse
// @Router /influx/researchers [get]
func (c *InfluxController) GetResearchers(ctx *gin.Context) {
	results := c.service.GetResearchers(ctx)

	ctx.JSON(http.StatusOK, results)
}
