import React, { useState } from 'react';
import Sidebar from './Sidebar';
import HeaderDashboard from './HeaderDashboard';
import { Outlet } from 'react-router-dom'; // <- IMPORTANTE

const DashboardLayout = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [produtosAberto, setProdutosAberto] = useState(false);
  const [artigosAberto, setArtigosAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <div className="flex">
      <Sidebar
        menuAberto={menuAberto}
        toggleMenu={toggleMenu}
        produtosAberto={produtosAberto}
        setProdutosAberto={setProdutosAberto}
        artigosAberto={artigosAberto}
        setArtigosAberto={setArtigosAberto}
      />

      <div className="flex-1">
        <HeaderDashboard toggleMenu={toggleMenu} />
        <main className="p-4">
          <Outlet /> {/* ← aqui as páginas internas serão renderizadas */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
