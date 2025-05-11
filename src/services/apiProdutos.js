import axios from 'axios';

const apiProdutos = axios.create({
  baseURL: 'http://localhost:5000/api/product', // URL do backend para produtos
  withCredentials: true, // se usares cookies para sessão
});

export default apiProdutos;
