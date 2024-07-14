import axios from 'axios';
import { get } from 'node_modules/axios/index.d.cts';
import { useEffect, useState } from 'react';

const API = 'http://localhost:8080';

// //funcao de rota para criar o usuario
// export const getUsuario = () => {
//   return axios.get(`${API}/usuario`);
// };
// //funcao para buscar um usuario especifico por id
// export const getUsuarioId = (id: string) => {
//   return axios.get(`${API}/usuario/${id}`);
// };

// //funcao para buscar todos os usuarios
// export const getUsuarios = () => {
//   return axios.get(`${API}/usuario/usuarios`);
// };

// //funcao para cadastrar o usuario
// export const cadastrarUsuario = () => {
//   return axios.post(`${API}/usuario/cadastrar`);
// };

// export const deletarUsuario = () => {
//   return axios.delete(`${API}/usuario/deletar`);
// };
//FUNCOES DE ACESSO
export const registro = (dados: {
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  senha: string;
}) => {
  return axios.post(`${API}/api/registro`, dados);
};

export const login = (dados: { email: string; senha: string }) => {
  return axios.post(`${API}/api/login`, dados);
};

//FUNCOES DO USUARIO DO BLOG
export const criarPost = () => {
  return axios.post(`${API}/api/post`);
};

export const buscarPosts = () => {
  return axios.get(`${API}/api/posts`);
};

export const buscarPost = (id: string) => {
  return axios.get(`${API}/api/posts/${id}`);
};

export const atualizarPost = (id: string) => {
  return axios.put(`${API}/api/atualizarpost/${id}`);
};

export const deletarPost = (id: string) => {
  return axios.delete(`${API}/api/posts/${id}`);
};

export const uploadImagem = () => {
  return axios.post(`${API}/api/upload-image`);
};
