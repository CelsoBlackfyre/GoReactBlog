package routes

import (
	"github.com/gofiber/fiber/v2"

	"github.com/celsoblackfyre/GoBlog/controller"
	"github.com/celsoblackfyre/GoBlog/middleware"
)

func Setup(app *fiber.App) {
	app.Post("/api/registro", controller.Registrar)
	app.Post("/api/login", controller.Login)
	app.Use(middleware.IfAutenticado)
	app.Post("/api/post", controller.CriarPost)
	app.Get("/api/posts", controller.BuscarTodosPosts)
	app.Get("/api/posts/:id", controller.BuscarPost)
	app.Put("/api/atualizarpost/:id", controller.AtualizarPost)
	app.Put("/api/postunico", controller.PostUnico)
	app.Delete("/api/deletarpost/:id", controller.DeletarPost)
	app.Post("/api/upload-image", controller.UploadImage)
	app.Static("/api/uploads", "./uploads")
}
