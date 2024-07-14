import React, { useState } from 'react';
import axios from 'axios';

// Tipo contendo as informações do usuário
type Usuario = {
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  senha: string;
};

// Função principal do container que contém o formulário
export default function FormRegistro() {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    senha: '',
  });

  // Função para alterar o valor do form com o input do usuário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Função para enviar os dados coletados pelo formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/registro', // Ajuste o URL conforme necessário
        usuario,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Cadastro realizado com sucesso:', response.data);
      setUsuario({
        nome: '',
        sobrenome: '',
        telefone: '',
        email: '',
        senha: '',
      });
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <>
      {/* Formulário de cadastro do usuário usando ReactJS e Tailwind */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="nome"
            className="input input-bordered flex items-center gap-2"
          >
            Nome
            <input
              type="text"
              id="nome"
              name="nome"
              className="grow"
              placeholder="Digite seu nome"
              value={usuario.nome}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="sobrenome"
            className="input input-bordered flex items-center gap-2"
          >
            Sobrenome
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              className="grow"
              placeholder="Digite seu sobrenome"
              value={usuario.sobrenome}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="telefone"
            className="input input-bordered flex items-center gap-2"
          >
            Telefone
            <input
              type="text"
              id="telefone"
              name="telefone"
              className="grow"
              placeholder="Digite seu telefone"
              value={usuario.telefone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="input input-bordered flex items-center gap-2"
          >
            Email
            <input
              type="email"
              id="email"
              name="email"
              className="grow"
              placeholder="Digite seu email"
              value={usuario.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="senha"
            className="input input-bordered flex items-center gap-2"
          >
            Senha
            <input
              type="password"
              id="senha"
              name="senha"
              className="grow"
              placeholder="Digite sua senha"
              value={usuario.senha}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </>
  );
}
