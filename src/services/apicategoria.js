import axios from 'axios';

const apicategoria = axios.create({
  baseURL: 'http://localhost:5000/api/product/categoriainfo', // URL do backend para produtos
  withCredentials: true, // se usares cookies para sessão
});

export default apicategoria;
