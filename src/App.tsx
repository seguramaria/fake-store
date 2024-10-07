import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import ProductDetail from './components/ProductDetail';
import { useBag } from './hooks/useBag';
import { useFecthData } from './hooks/useFecthData';
import Category from './components/Category';
import ScrollToTop from './components/ScrollToTop';
import InfoPage from './components/InfoPage';
import NotFoundPage from './components/NotFoundPage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  const {
    addToBag,
    bag,
    bagIsEmpty,
    bagTotal,
    clearBag,
    decreaseQuantity,
    getProductQuantity,
    increaseQuantity,
    removeProductFromBag,
  } = useBag();
  const { isLoading, products } = useFecthData();
  return (
    <Router>
      <CssBaseline />
      <ScrollToTop />
      <Header
        bag={bag}
        bagIsEmpty={bagIsEmpty}
        bagTotal={bagTotal}
        clearBag={clearBag}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeProductFromBag={removeProductFromBag}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              products={products}
              isLoading={isLoading}
              addToBag={addToBag}
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
              addToBag={addToBag}
              getProductQuantity={getProductQuantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />
        <Route
          path='/favorites'
          element={
            <FavoritesPage
              isLoading={isLoading}
              addToBag={addToBag}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              getProductQuantity={getProductQuantity}
            />
          }
        />
        <Route
          path='/category/:category'
          element={
            <Category
              products={products}
              isLoading={isLoading}
              addToBag={addToBag}
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
