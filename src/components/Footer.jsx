import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="max-w-7xl mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} - Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
