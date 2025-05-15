import { createContext, useContext, useState, useEffect } from "react";

// Criar o contexto
const CartContext = createContext();

// Hook customizado para usar o carrinho
export const useCart = () => useContext(CartContext);

// Componente provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("carrinho");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Adicionar item ao carrinho
  const addToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("carrinho", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Exportar o contexto diretamente para uso avançado (se necessário)
export { CartContext };
