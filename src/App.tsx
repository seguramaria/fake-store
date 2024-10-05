import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Grid from '@mui/material/Grid2';
import { CssBaseline, Box, Stack, Skeleton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Product } from './types';

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fecthProducts = async () => {
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
    fecthProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeProductFromCart = (id: number) => {
    const updateCart = cart.filter((item: Product) => item.id !== id);
    setCart(updateCart);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item: Product) => {
      if (item.id === id && item?.quantity) {
        return {
          ...item,
          quantity: item?.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map((item: Product) => {
        if (item.id === id && item?.quantity) {
          return {
            ...item,
            quantity: item?.quantity - 1,
          };
        }
        return item;
      })
      .filter((item: Product) => item?.quantity && item.quantity > 0);

    setCart(updatedCart);
  };

  const clearCart = () => setCart([]);

  const getProductQuantity = (productId: number) => {
    const productInCart = cart?.find((item: Product) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <>
      <CssBaseline />
      <Header
        cart={cart}
        clearCart={clearCart}
        decreaseQuantity={decreaseQuantity}
        //icon={data.icon}
        increaseQuantity={increaseQuantity}
        // name={data.name}
        removeProductFromCart={removeProductFromCart}
      />
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,
          backgroundImage: `url('./img/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            width: '14rem',
            mb: 2,
          }}
        >
          <CardMedia component='img' src='./img/logo.svg' alt='logo' />
        </Box>
      </Stack>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        p={5}
        spacing={2}
      >
        {products?.map((product: Product) =>
          isLoading ? (
            <Skeleton
              animation='pulse'
              variant='rectangular'
              width={'100%'}
              height={'100%'}
              sx={{ margin: '1.5rem' }}
            />
          ) : (
            <ProductCard
              key={product.id}
              addToCart={addToCart}
              product={product}
              quantity={getProductQuantity(product.id)}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          )
        )}
      </Grid>
      <Footer
      // icon={data.icon}
      //  name={data.name}
      />
    </>
  );
}

export default App;
