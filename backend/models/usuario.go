package models

import "golang.org/x/crypto/bcrypt"

type Usuario struct {
	ID        uint   `json:"id"`
	Nome      string `json:"nome"`
	Sobrenome string `json:"sobrenome"`
	Telefone  string `json:"telefone"`
	Email     string `json:"email"`
	Senha     []byte `json:"-"`
}

func (usuario *Usuario) SetSenha(senha string) {
	hashedSenha, err := bcrypt.GenerateFromPassword([]byte(senha), 14)
	if err != nil {
		panic(err)
	}
	usuario.Senha = hashedSenha
}

func (usuario *Usuario) CompararSenha(senha string) error {
	return bcrypt.CompareHashAndPassword(usuario.Senha, []byte(senha))
}
