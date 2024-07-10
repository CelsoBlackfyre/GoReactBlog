package models

type Blog struct {
	ID        uint    `json:"id"`
	Titulo    string  `json:"titulo"`
	Descricao string  `json:"descricao"`
	Image     string  `json:"image"`
	UsuarioID uint    `json:"usuarioid"`
	Usuario   Usuario `json:"usuario" gorm:"foreignKey:UsuarioID"`
}
