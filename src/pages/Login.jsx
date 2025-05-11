import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Tentando login com:', form); // Isso pode ser útil para depuração
    try {
      const res = await api.post('http://localhost:5000/api/users', form);
      console.log('Resposta da API:', res.data);
      
      // Caso o login seja bem-sucedido
      if (res.status === 200) {
        setMessage('Login bem-sucedido!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      // Mensagem de erro caso o login falhe
      setMessage(err.response?.data?.message || 'Credenciais inválidas');
    }
    console.log('Tentando logins com:', form); 
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Palavra-passe" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
