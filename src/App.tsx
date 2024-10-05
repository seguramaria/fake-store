import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import { Product } from './types';
import ProductDetail from './components/ProductDetail';
function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('API response error');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev: Product[]) => [...prev, { ...product, quantity: 1 }]);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = cart.filter((item: Product) => item.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item: Product) => {
      if (item.id === id && item.quantity) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map((item: Product) => {
        if (item.id === id && item.quantity && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item: Product) => item.quantity && item.quantity > 0);

    setCart(updatedCart);
  };

  const clearCart = () => setCart([]);

  const getProductQuanity = (productId: number) => {
    const productInCart = cart.find((item: Product) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <Router>
      <CssBaseline />
      <Header
        cart={cart}
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
              getProductQuantity={getProductQuanity}
            />
          }
        />
        <Route
          path='/product/:id'
          element={
            <ProductDetail
              addToCart={addToCart}
              getProductQuantity={getProductQuanity}
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
