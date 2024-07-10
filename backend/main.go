package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	"github.com/celsoblackfyre/GoBlog/database"
	"github.com/celsoblackfyre/GoBlog/routes"
)

func main() {
	database.Connect()
	error := godotenv.Load()
	if error != nil {
		panic("Erro ao carregar o .env file")
	}
	port := os.Getenv("PORT")
	app := fiber.New()
	routes.Setup(app)

	app.Listen(":" + port)
}
