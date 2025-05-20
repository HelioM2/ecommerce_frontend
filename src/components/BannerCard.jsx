import { Plus, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const BannerCard = ({ product }) => {
  if (!product || typeof product !== 'object') return null;

  const imageUrl = product.imagem && product.imagem.length > 0
    ? `http://localhost:5000/uploads/${product.imagem}`
    : '/images/default.jpg';

  //console.log('caminho>', imageUrl);

  const handleActivateBanner = async () => {

    const confirmar = window.confirm("Tens a certeza que queres adicionar este Banner?");
    if (!confirmar) return;
    try {
      const response = await fetch('http://localhost:5000/api/product/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product.idimg_banner }),
      });

      // Se a resposta não for JSON, lê como texto para ver o que deu errado
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          alert(data.message);
        } else {
          alert('Erro: ' + data.error);
        }
      } else {
        const text = await response.text();
        console.error('Resposta não JSON:', text);
        alert('Erro inesperado no servidor.');
      }

    } catch (error) {
      console.error('Erro ao ativar banner:', error);
    }
  };



  // const navigate = useNavigate();

  // const handleEdit = (id) => {
  //   navigate(`/editar-produto/${id}`);
  // };


  const handleDelete = async (id) => {

    const confirmar = window.confirm("Tens a certeza que queres eliminar este Banner?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:5000/api/product/deleteBanner/${id}`, {
        method: 'DELETE',
      });

      // Atualiza a página
      window.location.reload();

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          alert(data.message || 'Banner eliminado com sucesso');
          // Atualizar a lista de produtos se necessário
        } else {
          alert('Erro: ' + data.error);
        }
      } else {
        const text = await response.text();
        console.error('Resposta não JSON:', text);
        alert('Erro inesperado ao eliminar Banner.');
      }
    } catch (error) {
      console.error('Erro ao eliminar Banner:', error);
      alert('Erro de conexão ao eliminar Banner.');
    }
  };




  return (
    <div className="relative group">
      <div className="bg-white rounded-xl border p-4 text-center hover:shadow-md transition-all no-underline">
        <Link to={`/produto/${product.idimg_banner}`} className="no-underline">
          <img
            src={imageUrl}
            alt={product.titulo || 'Produto'}
            className="w-full h-40 object-contain rounded-md bg-white mb-2"
          />

          <p className="text-gray-800 font-semibold text-lg mb-4">
            {product.titulo || 'Nome não disponível'}
          </p>

          <p className="text-gray-800 font-semibold text-lg mb-4">
            {product.slogam || 'Slogam não disponível'}
          </p>
        </Link>

        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={handleActivateBanner}
            className="text-white p-2 rounded-full bg-green-500 hover:bg-green-600 transition"
            title="Adicionar ao banner"
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
            onClick={() => handleDelete(product.idimg_banner)}
            className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
            title="Eliminar"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
