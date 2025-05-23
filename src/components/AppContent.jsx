import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardLayout from '../components/DashboardLayout';
import Produtos from '../pages/Produtos';
import Register from '../pages/Register';
import CriarProduto from '../pages/CriarProduto';
import CriarImagemBanner from '../pages/CriarImagemBanner';
import Banner from '../pages/Banner';
import Criar_Detalhe_Produto from '../pages/Criar_Detalhe_Produto';
import Criar_Cor from '../pages/Criar_Cor';
import Criar_Tamanho from '../pages/Criar_Tamanho';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Dashboard from '../pages/Dashboard';
import RelatorioProdutos from '../pages/RelatorioProdutos';
import CriarCategoriaCor from '../pages/CriarCategoriaCor';
import ProdutoDetalhe from '../components/ProdutoDetalhe';
import ProdutoEditar from '../pages/EditProduto';
import Carrinho from '../pages/Carrinho';
import Orders from '../pages/Orders';
import ProdutoDetalhesBack from '../pages/produtoDetalhesBack';

function AppContent() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/produtos') ||
                      location.pathname.startsWith('/orders') ||
                      location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Header só nas rotas públicas */}
      {!isDashboard && <Header />}

      <main className="flex-grow">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/register" element={<Register />} />
          <Route path="/produto/:id" element={<ProductDetails />} />

          {/* Rotas com layout de dashboard */}
          <Route element={<DashboardLayout />}>
            <Route path="/produtos/editprodutos/:id" element= {< ProdutoDetalhesBack />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/criar" element={<CriarProduto />} />
            <Route path="/produtos/criar_banner" element={<CriarImagemBanner />} />
            <Route path="/produtos/definir_banner" element={<Banner />} />
            <Route path="/produtos/color" element={<Criar_Cor />} />
            <Route path="/produtos/size" element={<Criar_Tamanho />} />
            <Route path="/produtos/detalhes" element={<Criar_Detalhe_Produto />} />
            <Route path="/produto/caregoria" element={<CriarCategoriaCor />} />
            <Route path="/produto/relatorio" element={<RelatorioProdutos />} />
            <Route path="/produto/ver/:id" element={<ProdutoDetalhe />} />
            <Route path="/produtos/editar/:id" element={<ProdutoEditar />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </main>

      {/* Footer só nas rotas públicas */}
      {!isDashboard && <Footer />}
    </>
  );
}

export default AppContent;
