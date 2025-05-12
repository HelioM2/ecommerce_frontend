import axios from 'axios';

const apicategoria = axios.create({
  baseURL: 'https://ecommercebackend-backend-afropoderosa.up.railway.app', // URL do backend para produtos
  withCredentials: true, // se usares cookies para sessão
});

export default apicategoria;
