import { Edit, Minus, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // certifica que o path está correto
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductCardDashBoard = ({ product }) => {

  // Definir a cor do cabeçalho baseado no status
  const headerClass = product.status === 1
    ? 'bg-green-500 text-white'  // verde para status 1
    : 'bg-red-500 text-white';   // vermelho para os outros
  const { addToCart } = useCart(); // ✅ Hook chamado no topo
  const [stock, setStock] = useState(null);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {

    axios.get(`http://localhost:5000/api/product/stock/${product.id}`)
      .then(response => {
        setStock(response.data);
        console.log(product.stock);
        setLoading(false);
      })
      .catch(error => {
        setErro('Erro ao carregar os dados do produto.');
        setLoading(false);
      });
  }, [product.id]);

  if (!product || typeof product !== 'object') return null;

  const imageList = product.image ? product.image.split(',') : [];
  const imageUrl = imageList.length > 0
    ? `http://localhost:5000/uploads/${imageList[0]}`
    : '/images/default.jpg';

  const handleAddTostore = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/product/status/${product.id}`, {
        //status: 'ativo'  // ou true, conforme a estrutura
      });
      // console.log('Status atualizado:', response.data);
      alert(product.name + ' Adicionado a loja');
      // opcional: mostrar mensagem ou atualizar lista
    } catch (error) {
      //  console.error('Erro ao atualizar status:', error);
      alert('Erro ao adicionar produto a loja');
    }
  };

  const handleremoveTostore = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/product/editstatus/${product.id}`, {
        //status: 'ativo'  // ou true, conforme a estrutura
      });
      // console.log('Status atualizado:', response.data);
      alert(product.name + ' Retirado da loja');
      // opcional: mostrar mensagem ou atualizar lista
    } catch (error) {
      //  console.error('Erro ao atualizar status:', error);
      alert('Erro ao Retirar o produto da loja');
    }
  };

  const handleeditTostore = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/product/editstatus/${product.id}`, {
        //status: 'ativo'  // ou true, conforme a estrutura
      });
      // console.log('Status atualizado:', response.data);
      alert(product.name + ' Retirado da loja');
      // opcional: mostrar mensagem ou atualizar lista
    } catch (error) {
      //  console.error('Erro ao atualizar status:', error);
      alert('Erro ao Retirar o produto da loja');
    }
  };

  const handleDeletedb = async (id) => {

    const confirmar = window.confirm("Tens a certeza que queres eliminar este Produto?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:5000/api/product/deletestockproduct/${id}`, {
        method: 'DELETE',
      });

      // Atualiza a página
      window.location.reload();

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          alert(data.message || 'Produto eliminado com sucesso');
          // Atualizar a lista de produtos se necessário
        } else {
          alert('Erro: ' + data.error);
        }
      } else {
        const text = await response.text();
        console.error('Resposta não JSON:', text);
        alert('Erro inesperado ao eliminar Produto.');
      }
    } catch (error) {
      console.error('Erro ao eliminar Produto:', error);
      alert('Erro de conexão ao eliminar Produto.');
    }
  };



  return (
    <div className="relative group">
      <div className="bg-white rounded-xl border p-4 text-center hover:shadow-md transition-all">

        {/* Cabeçalho colorido */}
        <div className={`${headerClass} rounded-t-md p-2 mb-3 font-bold flex justify-between items-center`}>
          <span>
            {product.status === 1 ? 'Produto na Loja' : 'Produto fora da Loja'}
          </span>
          {stock !== null && (
            <span className="bg-white text-black text-xs font-semibold px-2 py-0.5 rounded-full shadow">
              {stock.totalStock}
            </span>
          )}
        </div>


        <Link to={`/produtos/editprodutos/${product.id}`} className="no-underline">
          <img
            src={imageUrl}
            alt={product.name || 'Produto'}
            className="w-full h-40 object-contain rounded-md bg-white mb-2"
          />

          <p className="text-gray-800 font-semibold text-lg mb-4">
            {product.name || 'Nome não disponível'}
          </p>
        </Link>

        {/* Preço + botão na mesma linha */}
        <div className="flex flex-wrap items-center justify-between px-1 mt-2 gap-2 sm:flex-nowrap">
          {/* Preço à esquerda */}
          <span className="text-black font-bold text-base">
            {product.price ? `${product.price}€` : 'Preço não disponível'}
          </span>

          {/* Botões à direita */}
          <div className="flex items-center gap-2 w-full justify-center sm:w-auto sm:justify-end">
            <button
              onClick={handleAddTostore}
              className="text-white bg-green-500 p-2 rounded-full hover:bg-green-600 transition"
              title="Adicionar a Loja"
            >
              <Plus size={18} />
            </button>

            <button
              onClick={handleremoveTostore}
              className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
              title="Retirar da Loja"
            >
              <Minus size={18} />
            </button>

            <Link
              to={`/produtos/editar/${product.id}`}
              className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
              title="Editar"
            >
              <Edit size={18} />
            </Link>


            <button
              onClick={() => handleDeletedb(product.id)}  
              className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
              title="Eliminar"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>


      </div>
    </div>

  );
};

export default ProductCardDashBoard;
