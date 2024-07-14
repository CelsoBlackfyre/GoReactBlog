import { useState } from 'react';
import { login } from '@/services/route';

///Tipo contendo as infos do usuario
type Usuario = {
  email: string;
  senha: string;
};

//Funcao de exportar os conteudos de login
export default function Login() {
  const [login, setLogin] = useState(false);

  //Funcao para trocar os valores do login
  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  //Funcao para enviar os dados usuario e efetuar o login
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
      {/* Form de Login usando ReactJS e Tailwind */}
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
