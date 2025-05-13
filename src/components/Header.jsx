import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-2 z-50">
      <div className="max-w-[80%] mx-auto flex justify-between items-center mt-0">
        {/* Logo ou Nome da Loja */}
        <div className="text-xl font-bold mr-0">
          <a href="/" className="text-white no-underline hidden lg:flex justify-center items-center mt-0 space-x-6">AfroPoderosa</a>
        </div>

        {/* Ícone do hambúrguer */}
        <div className="lg:hidden">
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'X' : '☰'}
          </button>
        </div>

        {/* Navegação no desktop (visível apenas no desktop) */}
        <nav className="hidden lg:flex justify-center items-center mt-2 space-x-6">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-gray-400 no-underline text-white">Home</a>
            </li>
            <li>
              <a href="/produtos" className="hover:text-gray-400 no-underline text-white">Produtos</a>
            </li>
            <li>
              <a href="/sobre" className="hover:text-gray-400 no-underline text-white">Sobre</a>
            </li>
            <li>
              <a href="/contato" className="hover:text-gray-400 no-underline text-white">Contato</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menu do mobile (visível somente quando o hambúrguer é aberto) */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}  p-4 text-center`}>
        <ul className="flex flex-col items-center space-y-4">
          <li>
            <a href="/" className="hover:text-gray-400 no-underline text-white">Home</a>
          </li>
          <li>
            <a href="/produtos" className="hover:text-gray-400 no-underline text-white">Produtos</a>
          </li>
          <li>
            <a href="/sobre" className="hover:text-gray-400 no-underline text-white">Sobre</a>
          </li>
          <li>
            <a href="/contato" className="hover:text-gray-400 no-underline text-white">Contato</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
