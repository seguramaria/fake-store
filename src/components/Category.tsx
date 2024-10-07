import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Stack, Typography, Skeleton, Button } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const isDesktop = useMediaQuery('(min-width:600px)');
  const isDesktopXL = useMediaQuery('(min-width:1500px)');
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
      {categoryProducts.length > 0 && !isLoading && (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: isDesktop ? 'calc(100vh - 500px)' : 'calc(100vh - 400px)',
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
      )}
      <Grid
        container
        alignItems='center'
        justifyContent={isDesktopXL ? 'flex-start' : 'center'}
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
          <Stack
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 'calc(100vh - 240px)',
            }}
          >
            <Typography variant='h5' sx={{ mb: 3 }}>
              No products found in this category.
            </Typography>
            <Button
              variant='contained'
              color='inherit'
              component={Link}
              to='/'
              sx={{ width: '60%' }}
            >
              Go Back Home
            </Button>
          </Stack>
        )}
      </Grid>
    </Stack>
  );
}

export default CategoryPage;
