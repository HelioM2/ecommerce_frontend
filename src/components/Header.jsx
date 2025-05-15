import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // ou outro ícone que usas

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white p-2 z-50">
      <div className="max-w-[80%] mx-auto flex justify-between items-center mt-0">
        {/* Logo */}
        <div className="text-xl font-bold mr-0">
          <a href="/" className="text-[#FED4EF] no-underline hidden lg:flex justify-center items-center mt-0 space-x-6">
            AfroPoderosa
          </a>
        </div>

          {/* Ícone carrinho + botão hamburguer (mobile only) */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Carrinho - mobile */}
          <div className="relative">
            <Link to="/carrinho">
              <ShoppingCart size={24} className="text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

        {/* Menu hambúrguer (mobile) */}
         
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'X' : '☰'}
          </button>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden lg:flex justify-center items-center mt-2 space-x-6">
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-400 no-underline text-white">Home</a></li>
            <li><a href="/produtos" className="hover:text-gray-400 no-underline text-white">Produtos</a></li>
            <li><a href="/sobre" className="hover:text-gray-400 no-underline text-white">Sobre</a></li>
            <li><a href="/contato" className="hover:text-gray-400 no-underline text-white">Contato</a></li>
            <li className="relative">
            <Link to="/carrinho" className="flex items-center space-x-2">
              <ShoppingCart size={24} className="text-white" />
              {cartItems.length > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>
          </ul>
        </nav>
      </div>

      {/* Menu mobile */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} p-4 text-center`}>
        <ul className="flex flex-col items-center space-y-4">
          <li><a href="/" className="hover:text-gray-400 no-underline text-white">Home</a></li>
          <li><a href="/produtos" className="hover:text-gray-400 no-underline text-white">Produtos</a></li>
          <li><a href="/sobre" className="hover:text-gray-400 no-underline text-white">Sobre</a></li>
          <li><a href="/contato" className="hover:text-gray-400 no-underline text-white">Contato</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
