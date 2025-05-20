import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Certifique-se de que a Sidebar está pronta para ser reutilizada
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Orders = () => {
  const [dados, setDados] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  // Carregar os pedidos da DB
  useEffect(() => {

    axios.get('http://localhost:5000/api/orders/por-tempo')
            .then(res => setDados(res.data))
            .catch(err => console.error('Erro ao carregar gráfico:', err));


    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
        
      })
      .catch(err => {
        setError('Erro ao carregar os pedidos');
        setLoading(false);
      });
  }, []);
 

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen">

      <main className="flex-1 p-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Pedidos</h1>

         
          {/* Tabela de pedidos */}
          <table className="w-full border border-gray-300 mb-10">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b">ID do Pedido</th>
                <th className="py-3 px-4 border-b">ID do Usuário</th>
                <th className="py-3 px-4 border-b">ID do Produto</th>
                <th className="py-3 px-4 border-b">Quantidade</th>
                <th className="py-3 px-4 border-b">Data</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="py-3 px-4 border-b">{order.id}</td>
                  <td className="py-3 px-4 border-b">{order.user_id}</td>
                  <td className="py-3 px-4 border-b">{order.product_id}</td>
                  <td className="py-3 px-4 border-b">{order.quantity}</td>
                  <td className="py-3 px-4 border-b">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

           <div className="w-full h-96 bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold mb-4">Pedidos por Dia</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dados}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total_pedidos" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;
