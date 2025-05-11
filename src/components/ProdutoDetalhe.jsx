import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProdutoDetalhe = ({ match }) => {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = match.params;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${id}`)
      .then(response => {
        setProduto(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar o produto');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{produto.name}</h1>
      <img src={`http://localhost:5000/uploads/${produto.image}`} alt={produto.name} />
      <p>Preço: € {produto.price}</p>
      <p>Quantidade: {produto.quantidade}</p>
      <p>Categoria: {produto.categoria}</p>
    </div>
  );
};

export default ProdutoDetalhe;
