import { Edit, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // certifica que o path está correto

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // ✅ Hook chamado no topo

  if (!product || typeof product !== 'object') return null;

  const imageList = product.image ? product.image.split(',') : [];
  const imageUrl = imageList.length > 0
    ? `http://localhost:5000/uploads/${imageList[0]}`
    : '/images/default.jpg';

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      image: imageUrl,
      price: product.price,
      quantidade: 1,
      cor: product.cor || '',
      tamanho: product.tamanho || '',
    };

    addToCart(item);
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <div className="relative group">
      <div className="bg-white rounded-xl border p-4 text-center hover:shadow-md transition-all no-underline">
        <Link to={`/produto/${product.id}`} className="no-underline">
          <img
            src={imageUrl}
            alt={product.name || 'Produto'}
            className="w-full h-40 object-contain rounded-md bg-white mb-2 "
          />

          <p className="text-gray-800 font-semibold text-lg mb-4">
            {product.name || 'Nome não disponível'}
          </p>
        </Link>

        {/* Preço + botão na mesma linha */}
        <div className="flex items-center justify-between px-1 mt-2 flex-wrap gap-2">
          {/* Preço à esquerda */}
          <span className="text-black font-bold text-base">
            {product.price ? `${product.price}€` : 'Preço não disponível'}
          </span>

          {/* Botões à direita */}
          <div className="flex items-center gap-2">
            <button
              //onClick={handleAddToCart}
              className="text-white bg-green-500 p-2 rounded-full hover:bg-green-600 transition"
              title="Adicionar ao carrinho"
            >
              <Plus size={18} />
            </button>

            <button
              // onClick={() => handleEdit(product.idimg_banner)}
              className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
              title="Editar"
            >
              <Edit size={18} />
            </button>

            <button
              // onClick={() => handleDelete(product.idimg_banner)}
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

export default ProductCard;
