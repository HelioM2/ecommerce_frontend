import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams(); // Obtém o ID do produto da URL
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantidade: '',
    categoria: '',
    image: ''
  });
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Função para buscar os dados do produto
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    }

    // Função para buscar categorias
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/product/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantidade', product.quantidade);
    formData.append('categoria', product.categoria);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      await axios.put(`/api/product/${id}`, formData);
      history.push('/products'); // Redirecionar após sucesso
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div className="container">
      <h1>Atualizar Produto</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={product.quantidade}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <select
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Imagem:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Atualizar Produto</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
