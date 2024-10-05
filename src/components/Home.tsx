import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid2';
import { Box, Stack, Skeleton, CardMedia } from '@mui/material';
import { Product } from '../types';

type Props = {
  products: Product[];
  isLoading: boolean;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getProductQuantity: (productId: number) => number;
};

function Home({
  products,
  isLoading,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  getProductQuantity,
}: Props) {
  return (
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
      {/* <Box sx={{ width: '14rem', mb: 2 }}>
        <CardMedia component='img' src='./img/logo.svg' alt='logo' /> TODO: Add image
      </Box> */}
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        p={5}
        spacing={2}
      >
        {products.map((product: Product) =>
          isLoading ? (
            <Skeleton
              key={product.id}
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
    </Stack>
  );
}

export default Home;
