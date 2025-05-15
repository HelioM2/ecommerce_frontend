import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // certifica que o path está correto

const BannerCard = ({ product }) => {
    const { addToCart } = useCart(); // ✅ Hook chamado no topo

    if (!product || typeof product !== 'object') return null;

    const imageList = product.image ? product.image.split(',') : [];
    const imageUrl = imageList.length > 0
        ? `https://ecommercebackend-backend-afropoderosa.up.railway.app/uploads/${imageList[0]}`
        : '/images/default.jpg';

    const handleAddToCart = () => {
        const item = {
            id: product.idimg_banner,
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
    <Link to={`/produto/${product.idimg_banner}` } className ="no-underline">
      <img
        src={imageUrl}
        alt={product.titulo || 'Produto'}
        className="w-full h-40 object-contain rounded-md bg-white mb-2 "
      />

      <p className="text-gray-800 font-semibold text-lg mb-4">
        {product.titulo || 'Nome não disponível'}
      </p>

      <p className="text-gray-800 font-semibold text-lg mb-4">
        {product.slogam || 'Slogam não disponível'}
      </p>
    </Link>

    {/* Preço + botão na mesma linha */}
    <div className="flex items-center justify-between px-1 mt-2">

      <button
        onClick={handleAddToCart}
        className="text-black p-2 rounded-full hover:bg-[#59414F] border-2 border-black border-transparent hover:border-[#FED4EF] hover:text-white transition flex items-center justify-center"
        title="Adicionar ao carrinho"
      >
        <ShoppingCart size={18} />
      </button>
    </div>
  </div>
</div>

    );
};

export default BannerCard;
