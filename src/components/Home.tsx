import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid2';
import { Box, Stack, Skeleton, Typography, Button } from '@mui/material';
import { Product } from '../types';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom

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
  const productsGroupedByCategory = products.reduce(
    (group: { [key: string]: Product[] }, product) => {
      const { category } = product;
      if (category !== 'electronics') {
        if (!group[category]) {
          group[category] = [];
        }
        group[category].push(product);
      }
      return group;
    },
    {}
  );

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
      {Object.entries(productsGroupedByCategory).map(
        ([category, categoryProducts]) => (
          <Box key={category} sx={{ width: '100%', mb: 4 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>
              {category}
            </Typography>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              p={5}
              spacing={2}
            >
              {categoryProducts
                .slice(0, 3)
                .map((product: Product) =>
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
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant='outlined'
                component={Link}
                to={`/category/${category}`} // Enlace a la página de la categoría
              >
                See more
              </Button>
            </Box>
          </Box>
        )
      )}
    </Stack>
  );
}

export default Home;
