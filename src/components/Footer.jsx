import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaYoutube, FaPinterest } from 'react-icons/fa6';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-12 max-w-[80%] mx-auto">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h4 className="font-semibold mb-2 text-sm sm:text-base md:text-lg lg:text-xl">Conheça-nos</h4>
          <ul className="space-y-1 text-xs sm:text-sm md:text-base lg:text-base text-gray-500">
            <li>Home</li>
            <li>Produtos</li>
            <li>Sobre</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-center">
          <h4 className="font-semibold mb-2 text-sm sm:text-base md:text-lg lg:text-xl">Atendimento ao Cliente</h4>
          <ul className="space-y-1 text-xs sm:text-sm md:text-base lg:text-base text-gray-500">
            <li>Política de devolução</li>
            <li>Informações de envio</li>
            <li>Alertas de produtos</li>
            <li>Relatar atividade</li>
            <li>Pedido mínimo</li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h4 className="font-semibold mb-2 text-sm sm:text-base md:text-lg lg:text-xl">Conecte-se conosco</h4>
          <div className="flex gap-3 text-base sm:text-lg md:text-xl lg:text-xl">
            <FaInstagram />
            <FaFacebookF />
            <FaXTwitter />
            <FaTiktok />
            <FaYoutube />
            <FaPinterest />
          </div>
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h4 className="font-semibold mb-2 text-sm sm:text-base md:text-lg lg:text-xl">Nós aceitamos</h4>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-5 sm:h-6 md:h-7 lg:h-7"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="h-5 sm:h-6 md:h-7 lg:h-7"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-5 sm:h-6 md:h-7 lg:h-7"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center space-y-2 text-xs sm:text-sm md:text-base lg:text-base">
        <p className='text-gray-500'>© 2025 Hélio Antunes.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:underline text-gray-500">Termos de utilização</a>
          <a href="#" className="hover:underline text-gray-500">Política de Privacidade</a>
          <a href="#" className="hover:underline text-gray-500">As suas opções de privacidade</a>
          <a href="#" className="hover:underline text-gray-500">Opções de anúncios</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

