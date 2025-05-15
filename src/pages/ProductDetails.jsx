import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Importando o Swiper diretamente
import 'swiper/css'; // Importação do CSS do Swiper
import { useCart } from "../components/CartContext";

// Importando os módulos necessários diretamente
import { Navigation, Pagination, A11y } from "swiper";

const ProductDetails = () => {
  const [cores, setCores] = useState([]);
  const [size, setSize] = useState(null);
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");


  useEffect(() => {
    axios.get(`https://ecommercebackend-backend-afropoderosa.up.railway.app/api/product/coresDetails/${id}`)
      .then(res => setCores(res.data))
      .catch(() => setCores([]));

    axios.get(`https://ecommercebackend-backend-afropoderosa.up.railway.app/api/product/productSize/${id}`)
      .then(res => setSize(res.data))
      .catch(() => setSize([]));

    axios.get(`https://ecommercebackend-backend-afropoderosa.up.railway.app/api/product/${id}`).then((res) => {
      let produtoData = res.data;
      if (produtoData.image && typeof produtoData.image === 'string') {
        const imagensArray = produtoData.image.split(',').map(img => `https://ecommercebackend-backend-afropoderosa.up.railway.app/uploads/${img.trim()}`);
        produtoData.images = imagensArray;
      }
      setProduto(produtoData);
      const imageUrl = produtoData.images && produtoData.images.length > 0
        ? produtoData.images[0]
        : (produtoData.image ? `https://ecommercebackend-backend-afropoderosa.up.railway.app/uploads/${produtoData.image}` : '/images/default.webp');
      setImagemSelecionada(imageUrl);
    });
  }, [id]);

  //adicionar produto ao carrinho
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const quantidade = document.querySelector("input[type='number']").value;
    const corSelect = document.querySelector("select[name='categoria']");
    const cor = corSelect?.value;
    const corNome = corSelect?.options[corSelect.selectedIndex]?.text;

    // Verificações
    if (!cor || cor === "") {
      alert("Por favor, selecione uma cor.");
      return;
    }

    if (!tamanhoSelecionado || tamanhoSelecionado === "") {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    if (!quantidade || parseInt(quantidade) < 1) {
      alert("Por favor, insira uma quantidade válida.");
      return;
    }

    const item = {
      id: produto.id,
      name: produto.name,
      image: imagemSelecionada,
      price: produto.price,
      cor: corNome,
      tamanho: tamanhoSelecionado,
      quantidade: parseInt(quantidade),
    };

    addToCart(item);
    alert("Produto adicionado ao carrinho!");
  };



  if (!produto) return <div>Carregando...</div>;

  return (
    <div className="px-4 sm:px-6 pt-4 text-sm text-gray-600 max-w-screen-xl mx-auto">
      <nav className="flex items-center space-x-2 mt-20 md:space-x-4">
        <Link to="/" className="hover:underline text-blue-600">Início</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{produto?.name}</span>
      </nav>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 ">
        {/* IMAGEM DO PRODUTO */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Miniaturas - visível apenas em modo desktop */}
          <div className="hidden md:flex flex-col gap-2 max-w-[100px] overflow-y-auto max-h-[500px]">
            {produto.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`miniatura-${idx}`}
                onClick={() => setImagemSelecionada(img)}
                className={`w-full h-20 object-cover cursor-pointer border ${imagemSelecionada === img ? "border-black" : "border-gray-300"
                  } rounded`}
              />
            ))}
          </div>

          {/* Imagem Principal (em desktop mostra imagem selecionada; no mobile usa o Swiper) */}
          <div className="w-full">
            {/* Modo desktop - imagem selecionada */}
            <div className="hidden md:block">
              <img
                src={imagemSelecionada}
                alt="Imagem selecionada"
                className="w-full h-[500px] object-contain rounded-xl"
              />
            </div>

            {/* Modo mobile - Swiper */}
            <div className="block md:hidden">
              <Swiper
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                loop
                modules={[Navigation, Pagination, A11y]}
                className="product-image-carousel"
              >
                {produto.images?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`imagem-${idx}`}
                      onClick={() => setImagemSelecionada(img)}
                      className="w-full h-64 sm:h-80 md:h-[500px] object-contain rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6" >
            <h4 className="font-semibold">Cor</h4>
            <select
              name="categoria"
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
            <h4 className="font-semibold mt-4">Tamanho</h4>
            <div className="flex gap-2 flex-wrap">
              {size?.map((size) => (
                //<button key={size.id} className="border rounded px-3 py-1">{size.name}</button>
                <button
                  key={size.id}
                  onClick={() => setTamanhoSelecionado(size.name)}
                  className={`border rounded px-3 py-1 ${tamanhoSelecionado === size.name ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                    }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* ENTREGA 
          <div  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <label className="block font-semibold mt-4">Entrega</label>
            <select className="border rounded px-4 py-2 w-full">
              <option>1 a 3 dias úteis</option>
              <option>3 a 5 dias úteis</option>
            </select>
          </div>*/}

          {/* BOTÕES */}
          <h4 className="font-semibold mt-4">Quantidade</h4>
          <div className="flex items-center gap-4 mt-6">
            <input type="number" min="1" defaultValue="1" className="w-full sm:w-16 border px-2 py-1 rounded" />
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
