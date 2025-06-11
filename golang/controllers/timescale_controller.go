package controllers

import (
	"net/http"
	"strconv"

	"frosthand.com/boilerplate-golang/service"
	"github.com/gin-gonic/gin"
)

type TimescaleController struct {
	service *service.TimescaleService
}

func NewTimescaleController(service *service.TimescaleService) *TimescaleController {
	return &TimescaleController{service: service}
}

// GetResearchers godoc
// @Summary Get a list of researchers
// @Description Get researchers with pagination, filter, and sorting
// @Tags researchers
// @Accept  json
// @Produce  json
// @Param pageNumber query int false "Page Number"
// @Param pageSize query int false "Page Size"
// @Param name query string false "Filter by name"
// @Param sortBy query string false "Sort by field"
// @Success 200 {array} models.Researcher
// @Failure 400 {object} models.ErrorResponse
// @Router /timescale/researchers [get]
func (c *TimescaleController) GetResearchers(ctx *gin.Context) {
	pageNumber, _ := strconv.Atoi(ctx.DefaultQuery("pageNumber", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
	nameFilter := ctx.Query("name")
	sortBy := ctx.DefaultQuery("sortBy", "id asc")

	results, err := c.service.GetResearchers(pageNumber, pageSize, nameFilter, sortBy)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, results)
}
