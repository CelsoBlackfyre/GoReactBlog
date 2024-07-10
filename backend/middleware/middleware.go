package middleware

import (
	"github.com/gofiber/fiber/v2"

	"github.com/celsoblackfyre/GoBlog/util"
)

func IfAutenticado(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	if _, err := util.Parsejwt(cookie); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Nao Autenticado",
		})
	}
	return c.Next()
}
