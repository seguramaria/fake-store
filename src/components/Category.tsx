import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Stack, Typography, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types';

type Props = {
  products: Product[];
  isLoading: boolean;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getProductQuantity: (productId: number) => number;
};

function CategoryPage({
  products,
  isLoading,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  getProductQuantity,
}: Props) {
  const { category } = useParams<{ category: string }>();

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        backgroundImage: `url('/img/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product: Product) =>
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
          )
        ) : (
          <Typography>No products.</Typography>
        )}
      </Grid>
    </Stack>
  );
}

export default CategoryPage;
