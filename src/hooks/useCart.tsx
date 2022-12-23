import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Cart, Cart as CartList, Product, Stock } from '../types';
import { useProducts } from './useProducts';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

export interface CartContextData {
  cartList: CartList[];
  addProduct: (cartItem: Cart) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cartList, setCart] = useState<CartList[]>([]);

  useEffect(() => {
    api.get('cart')
      .then(response => setCart(response.data))
  }, []);

  const { products } = useProducts();

  const addProduct = async (cartItem: Cart) => {
    try {
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cartItem))
      setCart([...cartList, cartItem]);
    } catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider value={{ cartList: cartList, addProduct, removeProduct, updateProductAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  return useContext(CartContext);
}
