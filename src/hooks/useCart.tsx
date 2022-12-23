import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

export interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');
    return storagedCart ? JSON.parse(storagedCart) : [];
  });

  const addProduct = async (productId: number) => {
    try {
      const currentCart = [...cart];
      const productExistsInCart = cart.find(x => x.id === productId);
      const stock = await api.get(`/stock/${productId}`);

      var fodaSe = (productExistsInCart?.amount ?? 0 + 1);

      if (stock.data.amount === 0 || fodaSe >= stock.data.amount) {
        throw new Error("Item sem estoque");
      }

      if (productExistsInCart) {
        productExistsInCart.amount++;
      } else {
        const product = await api.get(`/products/${productId}`);
        const newProduct = {
          ...product.data, amount: 1
        };
        currentCart.push(newProduct);
      }

      setCart(currentCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(currentCart));

    } catch (e) {
      toast.error("" + e);
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(p => p.id === productId);

      if (productIndex === -1) {
        throw new Error();
      }

      updatedCart.splice(productIndex, 1);
      setCart(updatedCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
    } catch (e) {
      toast.error("" + e);
    }
  };

  const updateProductAmount = async ({ productId, amount }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        throw new Error("Quantidade inválida");
      }

      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;
      if (amount > stockAmount) {
        throw new Error("Quantidade solicitada indisponível.");
      }
      const updatedCart = [...cart];
      const productExists = updatedCart.find(x => x.id === productId);

      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      } else {
        throw new Error("Quantidade solicitada indisponível.");
      }

    } catch (e) {
      toast.error("" + e);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProductAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  return useContext(CartContext);
}