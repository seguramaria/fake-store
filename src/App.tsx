import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import ProductDetail from './components/ProductDetail';
import { useCart } from './hooks/useCart';
import { useFecthData } from './hooks/useFecthData';
import Category from './components/Category';
import ScrollToTop from './components/ScrollToTop';
import InfoPage from './components/InfoPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const {
    addToCart,
    cart,
    cartIsEmpty,
    cartTotal,
    clearCart,
    decreaseQuantity,
    getProductQuantity,
    increaseQuantity,
    removeProductFromCart,
  } = useCart();
  const { isLoading, products } = useFecthData();
  return (
    <Router>
      <CssBaseline />
      <ScrollToTop />
      <Header
        cart={cart}
        cartIsEmpty={cartIsEmpty}
        cartTotal={cartTotal}
        clearCart={clearCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeProductFromCart={removeProductFromCart}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              products={products}
              isLoading={isLoading}
              addToCart={addToCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              getProductQuantity={getProductQuantity}
            />
          }
        />
        <Route
          path='/product/:id'
          element={
            <ProductDetail
              addToCart={addToCart}
              getProductQuantity={getProductQuantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />
        <Route
          path='/category/:category'
          element={
            <Category
              products={products}
              isLoading={isLoading}
              addToCart={addToCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              getProductQuantity={getProductQuantity}
            />
          }
        />
        <Route path='/info' element={<InfoPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
