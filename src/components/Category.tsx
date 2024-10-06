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
  const categoryImage: {
    "men's clothing": string;
    jewelery: string;
    "women's clothing": string;
  } = {
    "men's clothing": '/img/category-men.jpg',
    jewelery: '/img/category-jewelery.jpg',
    "women's clothing": '/img/category-women.jpg',
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 500px)',
          backgroundImage: `url(${
            categoryImage[category as keyof typeof categoryImage]
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant='h3' sx={{ mb: 2.5 }}>
          {category?.toUpperCase()}
        </Typography>
      </Stack>
      <Grid
        container
        alignItems='center'
        justifyContent='flex-start'
        p={5}
        spacing={2}
      >
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product: Product) =>
            isLoading ? (
              <Skeleton
                animation='pulse'
                variant='rectangular'
                width={270}
                height={336}
                sx={{ margin: '1.5rem' }}
              />
            ) : (
              <ProductCard
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
