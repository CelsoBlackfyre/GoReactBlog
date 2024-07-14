package controller

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"github.com/celsoblackfyre/GoBlog/database"
	"github.com/celsoblackfyre/GoBlog/models"
	"github.com/celsoblackfyre/GoBlog/util"
)

func CriarPost(c *fiber.Ctx) error {
	var blogpost models.Blog
	if err := c.BodyParser(&blogpost); err != nil {
		fmt.Println("Erro ao passar o body")
	}

	if err := database.BD.Create(&blogpost).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Erro ao criar o post",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Post criado com sucesso",
	})
}

func BuscarTodosPosts(c *fiber.Ctx) error {
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 5
	offset := (page - 1) * limit
	var total int64
	var getblog []models.Blog
	database.BD.Preload("Usuario").Limit(limit).Offset(offset).Limit(limit).Find(&getblog)
	database.BD.Model(&models.Blog{}).Count(&total)
	return c.JSON(fiber.Map{
		"data": getblog,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": (float64(int(total) / (limit))),
		},
	})
}

func BuscarPost(c *fiber.Ctx) error {

	id, _ := strconv.Atoi(c.Params("id"))
	var blogpost models.Blog
	database.BD.Where("id = ?", id).Preload("Usuario").First(&blogpost)
	return c.JSON(fiber.Map{
		"data": blogpost,
	})
}

func AtualizarPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	blog := models.Blog{
		ID: uint(id),
	}

	if err := c.BodyParser(&blog); err != nil {
		fmt.Println("Erro ao passar o body")
	}

	database.BD.Model(&blog).Updates(&blog)
	return c.JSON(fiber.Map{
		"message": "Post atualizado com sucesso",
	})
}

func PostUnico(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	var blog []models.Blog
	database.BD.Where("usuario_id = ?", id).Preload("Usuario").Find(&blog)

	return c.JSON(blog)
}

func DeletarPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	blog := models.Blog{
		ID: uint(id),
	}
	deletar := database.BD.Delete(&blog)
	if errors.Is(deletar.Error, gorm.ErrRecordNotFound) {
		return c.Status(404).JSON(fiber.Map{
			"message": "Post não encontrado",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Post deletado com sucesso",
	})
}
