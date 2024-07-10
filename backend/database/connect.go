package database

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/celsoblackfyre/GoBlog/models"
)

var BD *gorm.DB

// Conecta ao banco de dados
func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar o arquivo .env")
	}
	dsn := os.Getenv("DSN")
	dsn = strings.Replace(dsn, "loc=local", "loc=UTC", 1) //consertar erro de local do link da db
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Erro ao se conectar ao banco de dados")
	} else {
		log.Println("Conexão com o banco de dados estabelecida com sucesso!")
	}

	BD = database

	database.AutoMigrate(&models.Blog{}, &models.Usuario{})
}
