import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-2 z-50">
      <div className="max-w-[80%] mx-auto flex justify-between items-center mt-0">
        {/* Logo ou Nome da Loja */}
        <div className="text-xl font-bold">
          <a href="/" className="text-white no-underline">AfroPoderosa</a>
        </div>

        {/* Navegação */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-gray-400">Home</a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-400">Produtos</a>
            </li>
            <li>
              <a href="/sobre" className="hover:text-gray-400">Sobre</a>
            </li>
            <li>
              <a href="/contato" className="hover:text-gray-400">Contato</a>
            </li>
          </ul>
        </nav>

        {/* Botão de Login */}
        <div>
          <a href="/login" className=" text-white no-underline px-4 py-2 rounded-lg hover:bg-blue-500">
            Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
