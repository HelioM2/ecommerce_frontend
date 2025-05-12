import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:5000/api', // muda para tua URL/backend
  baseURL: 'https://ecommercebackend-backend-afropoderosa.up.railway.app',
  withCredentials: true, // se usares cookies para sessão
});

export default api;
