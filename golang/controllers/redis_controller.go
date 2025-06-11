package controllers

import (
	"context"
	"net/http"
	"strconv"

	"frosthand.com/boilerplate-golang/service"
	"github.com/gin-gonic/gin"
)

type RedisController struct {
	service *service.RedisService
}

func NewRedisController(service *service.RedisService) *RedisController {
	return &RedisController{service: service}
}

// GetResearchers godoc
// @Summary Get a list of researchers
// @Description Get researchers with pagination, filter, and sorting
// @Tags researchers
// @Accept  json
// @Produce  json
// @Param pageNumber query int false "Page Number"
// @Success 200 {array} models.Researcher
// @Failure 400 {object} models.ErrorResponse
// @Router /redis/researchers [get]
func (c *RedisController) GetResearchers(ctx *gin.Context) {
	pageNumber, _ := strconv.Atoi(ctx.DefaultQuery("pageNumber", "1"))

	results, err := c.service.GetResearcherByID(context.Background(), uint(pageNumber))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, results)
}
