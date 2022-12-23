import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import lodash, { add } from 'lodash';
import { useProducts } from '../../hooks/useProducts';
import { Cart } from '../../types';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function Home() {
  const { products } = useProducts();
  const { cartList, addProduct } = useCart();
  const cartItemsAmount = lodash.groupBy(cartList, "productId");

  function handleAddProduct(id: number) {
    const product = products.find(x => x.id === id) as Product;
    addProduct({ productId: id, amount: product.price });
  }

  return (
    <ProductList>
      {products.map(p => (
        <li key={p.id}>
          <img src={p.image} alt={p.title} />
          <strong>{p.title}</strong>
          <span>{formatPrice(p.price)}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(p.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[p.id]?.length || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

