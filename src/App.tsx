import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import { ProductsProvider } from './hooks/useProducts';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <Routes />
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
};

export default App;
