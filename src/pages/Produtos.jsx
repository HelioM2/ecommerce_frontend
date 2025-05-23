import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary';
import ProductCardDashBoard from '../components/ProductCardDashBoard';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Carregar os dados dos produtos  controllstore
  useEffect(() => {
    const fetchProducts = () => {
      axios.get('http://localhost:5000/api/product/all')
        .then(response => {
          setProdutos(response.data);
          const allZero = response.data.every(produto => produto.status === 0);
          setShowAlert(allZero);
          setLoading(false);
        })
        .catch(() => {
          setError('Erro ao carregar os produtos');
          setLoading(false);
        });
    };

    fetchProducts(); // busca inicial

    const interval = setInterval(fetchProducts, 5000); // busca a cada 5 segundos

    return () => clearInterval(interval); // limpa o intervalo quando o componente desmonta
  }, []);


  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen mt-0">
      <main className="flex-1 p-8">
        {showAlert && (
          <div className="bg-red-600 text-white font-bold p-4 mb-6 rounded">
            ⚠️ Atenção: Loja com 0 produtos!
          </div>
        )}
        <ErrorBoundary>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {produtos.map((produto) => (
              <ProductCardDashBoard key={produto.id} product={produto} />
            ))}
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Produtos;
