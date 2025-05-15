import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import AppContent from './components/AppContent';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
