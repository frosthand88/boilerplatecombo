package controllers

//
//import (
//	"net/http"
//	"strconv"
//
//	"frosthand.com/boilerplate-golang/service"
//	"github.com/gin-gonic/gin"
//)
//
//type DuckController struct {
//	service *service.DuckService
//}
//
//func NewDuckController(service *service.DuckService) *DuckController {
//	return &DuckController{service: service}
//}
//
//// GetResearchers godoc
//// @Summary Get a list of researchers
//// @Description Get researchers with pagination, filter, and sorting
//// @Tags researchers
//// @Accept  json
//// @Produce  json
//// @Param pageSize query int false "Page Size"
//// @Success 200 {array} models.Researcher
//// @Failure 400 {object} models.ErrorResponse
//// @Router /duck/researchers [get]
//func (c *DuckController) GetResearchers(ctx *gin.Context) {
//	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
//
//	results, err := c.service.GetResearchers(pageSize)
//	if err != nil {
//		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//		return
//	}
//
//	ctx.JSON(http.StatusOK, results)
//}
