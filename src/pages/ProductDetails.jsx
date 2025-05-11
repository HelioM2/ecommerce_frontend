import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const [cores, setCores] = useState([]);
  const [size, setSize] = useState(null);
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/coresDetails/${id}`)
      .then(res => setCores(res.data))
      .catch(() => setCores([]));

    axios.get(`http://localhost:5000/api/product/productSize/${id}`)
      .then(res => setSize(res.data))
      .catch(() => setSize([]));

    axios.get(`http://localhost:5000/api/product/${id}`).then((res) => {
      let produtoData = res.data;
      //console.log('IMAGEM: ', res.data.image);\

      // Corrigir o array de imagens
      if (produtoData.image && typeof produtoData.image === 'string') {
        const imagensArray = produtoData.image.split(',').map(img => `http://localhost:5000/uploads/${img.trim()}`);
        produtoData.images = imagensArray;
      }

      setProduto(produtoData);
      // Verifica se a imagem existe; caso não, usa uma imagem padrão
      const imageUrl = produtoData.images && produtoData.images.length > 0
        ? produtoData.images[0]
        : (produtoData.image ? `http://localhost:5000/uploads/${produtoData.image}` : '/images/default.webp');

      setImagemSelecionada(imageUrl);
    });
  }, [id]);



  if (!produto) return <div>Carregando...</div>;

  return (

    //breadcrumbs 
    <div className="max-w-6xl mx-auto px-6 pt-2 text-sm text-gray-600">
      <nav className="flex items-center space-x-2 mt-20">
        <Link to="/" className="hover:underline text-blue-600">Início</Link>
        {/* <span>/</span> */}
        {/* <Link to="/produtos" className="hover:underline text-blue-600">Produtos</Link> */}
        <span>/</span>
        <span className="text-gray-900 font-semibold">{produto?.name}</span>
      </nav>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        {/* IMAGEM DO PRODUTO */}
        {/* IMAGEM DO PRODUTO */}
        <div className="flex gap-4">
          {/* Miniaturas em coluna vertical */}
          <div className="flex flex-col gap-2">
            {produto.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`miniatura-${idx}`}
                onClick={() => setImagemSelecionada(img)}
                className={`w-20 h-20 object-cover cursor-pointer border ${img === imagemSelecionada ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Imagem principal */}
          <div>
            <img
              src={imagemSelecionada}
              alt={produto.name}
              className="rounded-xl w-[500px] h-[500px] object-contain"
            />
          </div>
        </div>


        {/* DETALHES DO PRODUTO */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{produto.name}</h2>
          <p className="text-gray-600">{produto.description}</p>

          <div className="text-xl font-semibold">
            {produto.price ? (
              <>
                <span className="text-orange-600 mr-2">{produto.price}€</span>
                <span className="line-through text-gray-500">{produto.price}€</span>
              </>
            ) : (
              `${produto.price}€`
            )}
          </div>

          {/* COR */}
          <div>
            <h4 className="font-semibold">Cor:</h4>
            <select
              name="categoria"
              // value={cor}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Selecione uma cor</option>
              {cores.length > 0 ? (
                cores.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              ) : (
                <option value="">Nenhuma cor disponível</option>
              )}
            </select>
          </div>

          {/* TAMANHO */}
          <div>
            <h4 className="font-semibold mt-4">Tamanho:</h4>
            <div className="flex gap-2 flex-wrap">
              {size.map((size) => (
                <button key={size.id} className="border rounded px-3 py-1">{size.name}</button>
              ))}
            </div>
          </div>


          {/* ENTREGA */}
          <div>
            <label className="block font-semibold mt-4">Entrega:</label>
            <select className="border rounded px-4 py-2 w-full">
              <option>1 a 3 dias úteis</option>
              <option>3 a 5 dias úteis</option>
            </select>
          </div>


          {/* BOTÕES */}
          <div className="flex items-center gap-4 mt-6">
            <input type="number" min="1" defaultValue="1" className="w-16 border px-2 py-1 rounded" />
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
