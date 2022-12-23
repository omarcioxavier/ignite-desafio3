import { CartContextData } from "./hooks/useCart";
import { ProductsContextData } from "./hooks/useProducts";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

export interface Stock {
  id: number;
  amount: number;
}

export interface Cart {
  productId: number;
  amount: number;
}