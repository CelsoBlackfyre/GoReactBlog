import react, { useState } from 'react';
import { registro } from '@/services/route';
import axios, { Axios } from 'axios';

//formulario de login do usuario
type Usuario = {
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  senha: string;
};

export default function FormRegistro() {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Dados = new Dados({
      nome: e.target.nome.value,
      sobrenome: e.target.sobrenome.value,
      telefone: e.target.telefone.value,
      email: e.target.email.value,
      senha: e.target.senha.value,
    });
    registro();
  };

  return (
    <>
      <form action="" onSubmit={registro}>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            placeholder="Digite seu nome"
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Sobrenome
          <input
            type="text"
            className="grow"
            placeholder="Digite seu sobrenome"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Telefone
          <input
            type="text"
            className="grow"
            placeholder="Digite seu telefone"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            className="grow"
            placeholder="Digite seu email"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Senha
          <input
            type="password"
            className="grow"
            onChange={() => handleChange}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Registrar
        </button>
      </form>
    </>
  );
}
