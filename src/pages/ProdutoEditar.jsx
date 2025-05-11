import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProdutoEditar = ({ match }) => {
  const [produto, setProduto] = useState({
    name: '',
    price: '',
    quantidade: '',
    categoria: '',
  });
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
        setError('Erro ao carregar os dados do produto');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/product/${id}`, produto)
      .then(response => {
        alert('Produto atualizado com sucesso!');
      })
      .catch(error => {
        setError('Erro ao atualizar o produto');
      });
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={produto.name}
        onChange={(e) => setProduto({ ...produto, name: e.target.value })}
      />
      <input
        type="number"
        value={produto.price}
        onChange={(e) => setProduto({ ...produto, price: e.target.value })}
      />
      <input
        type="number"
        value={produto.quantidade}
        onChange={(e) => setProduto({ ...produto, quantidade: e.target.value })}
      />
      <input
        type="text"
        value={produto.categoria}
        onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
      />
      <button type="submit">Atualizar Produto</button>
    </form>
  );
};

export default ProdutoEditar;
