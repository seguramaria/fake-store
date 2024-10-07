import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import Header from './components/common/Header';
import { CssBaseline } from '@mui/material';
import ProductDetailPage from './components/pages/ProductDetailPage';
import { useBag } from './hooks/useBag';
import { useFetchData } from './hooks/useFetchData';
import CategoryPage from './components/pages/CategoryPage';
import ScrollToTop from './components/common/ScrollToTop';
import InfoPage from './components/pages/InfoPage';
import NotFoundPage from './components/pages/NotFoundPage';
import FavoritesPage from './components/pages/FavoritesPage';

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
  const { isLoading, products } = useFetchData();
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
            <ProductDetailPage
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
            <CategoryPage
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
