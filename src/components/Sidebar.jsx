import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = ({ menuAberto, toggleMenu }) => {
  const [produtosAberto, setProdutosAberto] = useState(false);
  const [artigosAberto, setArtigosAberto] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-6 h-screen min-h-screen fixed md:static top-0 left-0 z-50 transform transition-transform duration-300 overflow-y-auto ${menuAberto ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div className="md:flex items-center gap-3 mb-6 hidden">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        <nav className="space-y-4">
          <Link to="/" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Utilizadores</Link>

          {/* Artigos
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
                <Link to="/artigos" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Ver Artigos</Link>
                <Link to="/artigos/criar" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Artigo</Link>
                <Link to="/artigos/relatorio" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Relatório de Artigos</Link>
                <Link to="/artigos/categorias" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Categoria</Link>
              </div>
            )}
          </div> */}

          {/* Produtos */}
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
                <Link to="/produtos" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Ver Produtos</Link>
                <Link to="/produtos/criar_banner" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Banner</Link>
                <Link to="/produtos/definir_banner" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Definir Banner</Link>
                <Link to="/produtos/criar" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Produto</Link>
                <Link to="/produtos/color" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Cor</Link>
                <Link to="/produtos/size" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Tamanho</Link>
                <Link to="/produtos/detalhes" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Definir Produto</Link>
                {/* <Link to="/produto/relatorio" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Relatório de Produtos</Link>
                <Link to="/produto/caregoria" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Criar Categoria</Link> */}
                {/* <Link to="/produto/relatorio" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Gráficos</Link> */}
              </div>
            )}
          </div>

          <Link to="/orders" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Relatorio Geral</Link>
          {/* <Link to="/relatorios" className="block hover:bg-[#B0789E] px-4 py-2 rounded">Relatórios</Link> */}
        </nav>
      </aside>

      {/* Overlay para mobile */}

      {menuAberto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
