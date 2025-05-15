import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react'; // ou outro ícone que estejas a usar
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [produtosAberto, setProdutosAberto] = useState(false);
  const [artigosAberto, setArtigosAberto] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
  {/* Logo e Título */}
  <div className="flex items-center space-x-3 mb-6">
    <img src={logo} alt="Logo Afro Poderosa" className="h-20 w-20 object-contain" />
    <h2 className="text-2xl font-bold">Dashboard</h2>
  </div>

  <nav className="space-y-4">
    <Link to="/" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
      Utilizadores
    </Link>

    {/* Artigos com submenu */}
    <div>
      <button
        onClick={() => setArtigosAberto(!artigosAberto)}
        className="flex items-center justify-between w-full hover:bg-[#B0789E] px-4 py-2 rounded"
      >
        <span>Artigos</span>
        {artigosAberto ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {artigosAberto && (
        <div className="ml-4 mt-2 space-y-2">
          <Link to="/artigos" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Ver Artigos
          </Link>
          <Link to="/artigos/criar" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Artigo
          </Link>
          <Link to="/artigos/relatorio" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Relatório de Artigos
          </Link>
          <Link to="/artigos/categorias" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Categoria
          </Link>
        </div>
      )}
    </div>

    {/* Produtos com submenu */}
    <div>
      <button
        onClick={() => setProdutosAberto(!produtosAberto)}
        className="flex items-center justify-between w-full hover:bg-[#B0789E] px-4 py-2 rounded"
      >
        <span>Produtos</span>
        {produtosAberto ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {produtosAberto && (
        <div className="ml-4 mt-2 space-y-2">
          <Link to="/produtos" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Ver Produtos
          </Link>
          <Link to="/produtos/criar_banner" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Banner
          </Link>
          <Link to="/produtos/definir_banner" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Definir Banner
          </Link>
          <Link to="/produtos/criar" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Produto
          </Link>
          <Link to="/produtos/color" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Cor
          </Link>
          <Link to="/produtos/size" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Tamanho
          </Link>
          <Link to="/produtos/detalhes" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Definir Produto
          </Link>
          <Link to="/produto/relatorio" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Relatório de Produtos
          </Link>
          <Link to="/produto/caregoria" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Criar Categoria
          </Link>
          <Link to="/produto/relatorio" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
            Gráficos
          </Link>
        </div>
      )}
    </div>

    <Link to="/orders" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
      Pedidos
    </Link>
    <Link to="/relatorios" className="block text-white no-underline hover:bg-[#B0789E] px-4 py-2 rounded">
      Relatórios
    </Link>
  </nav>
</aside>
  );
};

export default Sidebar;
