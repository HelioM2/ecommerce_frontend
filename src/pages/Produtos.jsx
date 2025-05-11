import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary'; 
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar os dados dos produtos
  useEffect(() => {
    // Fazendo a requisição ao backend
    axios.get('http://localhost:5000/api/product')  
      .then(response => {
        setProdutos(response.data);  // Assumindo que os dados são retornados como um array de produtos
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os produtos');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen mt-14">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        {/* <h1 className="text-3xl font-bold mb-6 text-center"></h1> */}
        <ErrorBoundary>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
              <ProductCard key={produto.id} product={produto} />
            ))}
        </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Produtos;
