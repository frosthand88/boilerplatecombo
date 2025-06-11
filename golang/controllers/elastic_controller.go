package controllers

import (
	"net/http"
	"strconv"

	"frosthand.com/boilerplate-golang/service"
	"github.com/gin-gonic/gin"
)

type ElasticController struct {
	service *service.ElasticService
}

func NewElasticController(service *service.ElasticService) *ElasticController {
	return &ElasticController{service: service}
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
// @Success 200 {array} models.Researcher
// @Failure 400 {object} models.ErrorResponse
// @Router /elastic/researchers [get]
func (c *ElasticController) GetResearchers(ctx *gin.Context) {
	pageNumber, _ := strconv.Atoi(ctx.DefaultQuery("pageNumber", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
	nameFilter := ctx.Query("name")

	results, total, err := c.service.GetResearchers(ctx, pageNumber, pageSize, nameFilter)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	print(total)

	ctx.JSON(http.StatusOK, results)
}
