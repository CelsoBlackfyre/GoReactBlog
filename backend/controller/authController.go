package controller

import (
	"fmt"
	"log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"

	"github.com/celsoblackfyre/GoBlog/database"
	"github.com/celsoblackfyre/GoBlog/models"
	"github.com/celsoblackfyre/GoBlog/util"
)

func validarEmail(email string) bool {
	Re := regexp.MustCompile(`[a-z0-9!#$%&'*+/=?^_` + "`" + `{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_` + "`" + `{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`)
	return Re.MatchString(email)
}

func Registrar(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.Usuario

	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Erro ao passar o body")
	}
	if len(data["senha"].(string)) <= 6 {
		c.Status(400)
		return c.JSON(fiber.Map{"status": "erro", "message": "A senha deve ter pelo menos 6 caracteres", "data": nil})
	}
	if !validarEmail(strings.TrimSpace(data["email"].(string))) {
		c.Status(400)
		return c.JSON(fiber.Map{"status": "erro", "message": "Email inválido", "data": nil})
	}
	//Verificar se o email ja existe no banco de dados
	database.BD.Where("email = ?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.ID != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{"status": "erro", "message": "Email já cadastrado", "data": nil})
	}
	usuario := models.Usuario{
		Nome:      data["nome"].(string),
		Sobrenome: data["sobrenome"].(string),
		Telefone:  data["telefone"].(string),
		Email:     strings.TrimSpace(data["email"].(string)),
	}

	usuario.SetSenha(data["senha"].(string))
	err := database.BD.Create(&usuario)
	if err != nil {
		log.Println(err)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"usuario": usuario,
		"message": "Usuário criado com sucesso",
	})
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Erro ao passar o body")
	}
	//Verificar se o email ja existe no banco de dados
	var usuario models.Usuario
	database.BD.Where("email = ?", data["email"]).First(&usuario)
	if usuario.ID == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Email inexistente",
		})
	}
	if err := usuario.CompararSenha(data["senha"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Senha incorreta",
		})
	}
	token, err := util.GenerateJwt(strconv.Itoa(int(usuario.ID)))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	cookie := fiber.Cookie{
		Name:    "jwt",
		Value:   token,
		Expires: time.Now().Add(time.Hour * 24),
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Logado com sucesso",
		"usuario": usuario,
	})
}

type Claims struct {
	jwt.StandardClaims
}
