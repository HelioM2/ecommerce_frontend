import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Erro:', err));
  }, []);

  return (
    <div className="flex min-h-screen mt-10">
      <Sidebar />
      <main className="flex-1 p-8 bg-white flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard de Usuários</h1>
        <div className="overflow-x-auto">
          <table className="min-w-[80%] border border-gray-300 mx-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Ver</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
