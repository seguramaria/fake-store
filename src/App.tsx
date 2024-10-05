import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import ProductDetail from './components/ProductDetail';
import { useCart } from './hooks/useCart';

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
    isLoading,
    products,
    removeProductFromCart,
  } = useCart();

  return (
    <Router>
      <CssBaseline />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
