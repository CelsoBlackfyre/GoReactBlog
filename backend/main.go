package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	"github.com/celsoblackfyre/GoBlog/database"
	"github.com/celsoblackfyre/GoBlog/routes"
)

func main() {

	database.Connect()
	error := godotenv.Load()
	if error != nil {
		panic("Erro ao carregar o arquivo .env ")
	}
	port := os.Getenv("PORT")
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders:     "Content-Type, Accept, Authorization",
	}))
	routes.Setup(app)

	app.Listen(":" + port)
}
