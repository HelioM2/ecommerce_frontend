import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:5000/api', // muda para tua URL/backend
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true, // se usares cookies para sessão
});

export default api;
