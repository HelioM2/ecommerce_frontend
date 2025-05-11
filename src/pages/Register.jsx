import { useState } from 'react';
import api from '../services/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setMessage(res.data.message || 'Utilizador registado com sucesso!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro no registo');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Registar</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nome" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Palavra-passe" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Registar</button>
      </form>
    </div>
  );
}

export default Register;
