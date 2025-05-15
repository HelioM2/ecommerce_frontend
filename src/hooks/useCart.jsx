// src/hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../components/CartContext';

export const useCart = () => {
  return useContext(CartContext);
};
