import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HeaderDashboard from '../pages/HeaderDashboard';
import Footer from '../components/Footer';

import Produtos from '../pages/Produtos';
import Register from '../pages/Register';
import CriarProduto from '../pages/CriarProduto';
import Criar_Detalhe_Produto from '../pages/Criar_Detalhe_Produto';
import Criar_Cor from '../pages/Criar_Cor';
import Criar_Tamanho from '../pages/Criar_Tamanho';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Dashboard from '../pages/Dashboard';
import RelatorioProdutos from '../pages/RelatorioProdutos';
import CriarCategoriaCor from '../pages/CriarCategoriaCor';
import ProdutoDetalhe from '../components/ProdutoDetalhe';
import ProdutoEditar from '../pages/ProdutoEditar';
import Carrinho from '../pages/Carrinho';
import Orders from '../pages/Orders';

function AppContent() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/produtos') ||
                      location.pathname.startsWith('/orders') ||
                      location.pathname.startsWith('/dashboard');

  return (
    <>
      {isDashboard ? <HeaderDashboard /> : <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/produtos/criar" element={<CriarProduto />} />
          <Route path="/produtos/color" element={<Criar_Cor />} />
          <Route path="/produtos/size" element={<Criar_Tamanho />} />
          <Route path="/produtos/detalhes" element={<Criar_Detalhe_Produto />} />
          <Route path="/produto/caregoria" element={<CriarCategoriaCor />} />
          <Route path="/produto/relatorio" element={<RelatorioProdutos />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/produto/ver/:id" element={<ProdutoDetalhe />} />
          <Route path="/produto/editar/:id" element={<ProdutoEditar />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default AppContent;
