import { useState } from 'react';
import { login } from '@/services/route';

//Form para fazer o login

type Usuario = {
  email: string;
  senha: string;
};

export default function Login() {
  const [login, setLogin] = useState(false);

  //funcao para verificar a senha
  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario: Usuario = {
      email: e.target.email.value,
      senha: e.target.senha.value,
    };
    login(usuario);
  };

  return (
    <>
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
          placeholder="Digite sua senha"
          onChange={handleChange}
        />
      </label>
    </>
  );
}
