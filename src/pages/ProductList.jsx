import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cores, setCores] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroCor, setFiltroCor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data);

        // Extrair categorias e cores únicas
        const categoriasUnicas = [...new Set(res.data.map(p => p.categoria))];
        const coresUnicas = [...new Set(res.data.map(p => p.cor))];
        setCategorias(categoriasUnicas);
        setCores(coresUnicas);
      })
      .catch(err => console.log("Erro ao buscar produtos:", err));
  }, []);

  const produtosFiltrados = products.filter(p => {
    return (
      (filtroCategoria === "" || p.categoria === filtroCategoria) &&
      (filtroCor === "" || p.cor === filtroCor)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Produtos</h2>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <select
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filtroCor}
          onChange={e => setFiltroCor(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Todas as cores</option>
          {cores.map(cor => (
            <option key={cor} value={cor}>{cor}</option>
          ))}
        </select>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {produtosFiltrados.map(prod => (
          <div key={prod.id} className="border p-4 rounded shadow">
            <img src={`http://localhost:5000/uploads/${prod.image}`} alt={prod.name} className="w-full h-48 object-cover mb-2" />
            {/* <h3 className="text-lg font-semibold no-underline">{prod.name}</h3> */}
            <p className="text-gray-600">{prod.price}€</p>
            {/* <p className="text-sm text-gray-500 no-underline">Cor: {prod.cor} | Categoria: {prod.categoria}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
