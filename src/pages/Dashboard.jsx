import Sidebar from '../components/Sidebar';
import HeaderDashboard from '../components/HeaderDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Erro:', err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <div className="flex flex-1">
    

        {/* Conteúdo principal */}
        <main className="flex-1 p-4 md:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Dashboard de Usuários</h1>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="w-full min-w-[500px] border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">ID</th>
                    <th className="text-left p-3">Nome</th>
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
    </div>
  );
};

export default DashboardPage;
