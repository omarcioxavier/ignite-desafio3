import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types';
import { api } from '../../services/api';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function Home() {
  const [productsFormated, setProduct] = useState<ProductFormatted[]>([]);
  const { cart, addProduct } = useCart();
  const cartItensAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;
    return newSumAmount;
  }, [] as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>("products");

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));

      setProduct(data);
    }
    loadProducts();
  }, []);

  async function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {productsFormated.map(x => (
        <li key={x.id}>
          <img src={x.image} alt={x.title} />
          <strong>{x.title}</strong>
          <span>{x.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(x.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItensAmount[x.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

