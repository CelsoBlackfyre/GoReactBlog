package controller

import (
	"math/rand"

	"github.com/gofiber/fiber/v2"
)

var letras = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func LetraAleatoria(n int) string {
	s := make([]rune, n)
	for i := range s {
		s[i] = letras[rand.Intn(len(letras))]
	}
	return string(s)
}

func UploadImage(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}
	files := form.File["image"]
	nomearquivo := ""
	for _, file := range files {
		nomearquivo = LetraAleatoria(5) + file.Filename
		if err := c.SaveFile(file, "./uploads/"+nomearquivo); err != nil {
			return nil
		}
	}
	return c.JSON(fiber.Map{
		"url": "http://localhost:3000/api/uploads/" + nomearquivo,
	})
}
