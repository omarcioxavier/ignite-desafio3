import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

export function Cart() {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(cart.reduce((sumTotal, product) => {
    return sumTotal + product.price * product.amount
  }, 0));

  function handleProductAmount(productId: number, value: number) {
    updateProductAmount({ productId, amount: value });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(cart => 
              <tr data-testid="product" key={cart.id}>
                <td>
                  <img src={cart.image} alt={cart.title} />
                </td>
                <td>
                  <strong>{cart.title}</strong>
                  <span>{cart.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={cart.amount <= 1}
                      onClick={() => handleProductAmount(cart.id, cart.amount - 1)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={cart.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductAmount(cart.id, cart.amount + 1)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{cart.subTotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(cart.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            )}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};