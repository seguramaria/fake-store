import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Stack, Typography, Skeleton, Button } from '@mui/material';
import { useFavorites } from '../../hooks/useFavorites';
import Grid from '@mui/material/Grid2';
import ProductCard from '../product/ProductCard';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
  addToBag: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  getProductQuantity: (productId: number) => number;
  increaseQuantity: (id: number) => void;
  isLoading: boolean;
};

const FavoritesPage = ({
  addToBag,
  decreaseQuantity,
  getProductQuantity,
  increaseQuantity,
  isLoading,
}: Props) => {
  const { favorites } = useFavorites();
  const isDesktop = useMediaQuery('(min-width:600px)');
  const isDesktopXL = useMediaQuery('(min-width:1500px)');

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
          height: isDesktop ? 'calc(100vh - 500px)' : 'calc(100vh - 400px)',
          backgroundImage: 'url(./img/favorites.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant='h3' sx={{ mb: 2.5 }}>
          Favorites
        </Typography>
      </Stack>

      <Grid
        container
        alignItems='center'
        justifyContent={isDesktopXL ? 'flex-start' : 'center'}
        p={5}
        spacing={2}
      >
        {isLoading ? (
          Array.from({ length: favorites.length }).map((_, index) => (
            <Skeleton
              key={index}
              animation='pulse'
              variant='rectangular'
              width={270}
              height={336}
              sx={{ margin: '1.5rem' }}
            />
          ))
        ) : favorites.length > 0 ? (
          favorites.map((product: Product) => (
            <ProductCard
              key={product.id}
              addToBag={addToBag}
              product={product}
              quantity={getProductQuantity(product.id)}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))
        ) : (
          <Stack
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 'calc(100vh - 240px)',
            }}
          >
            <Typography variant='h5' sx={{ mb: 3 }}>
              You have no products added to favorites.
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
};

export default FavoritesPage;
