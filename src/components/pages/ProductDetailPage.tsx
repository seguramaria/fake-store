import { useParams } from 'react-router-dom';
import {
  Button,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Skeleton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Product } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { useFetchData } from '../../hooks/useFetchData';

type Props = {
  addToBag: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  getProductQuantity: (productId: number) => number;
};

const ProductDetail = ({
  addToBag,
  getProductQuantity,
  decreaseQuantity,
  increaseQuantity,
}: Props) => {
  const { id } = useParams();
  const { productDetail, isLoading } = useFetchData(id);
  const { favorites, toggleFavorite } = useFavorites();
  const isDesktop = useMediaQuery('(min-width:600px)');
  const isFavorite = favorites.some((fav) => fav.id === productDetail?.id);

  if (isLoading) {
    return (
      <>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 'calc(100vh - 480px)',
          }}
        />
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <Skeleton variant='rectangular' width={300} height={200} />
        </Stack>
      </>
    );
  }

  if (!productDetail) return null;

  const quantity = getProductQuantity(productDetail.id);
  const { image, price, description, title, category } = productDetail;

  const categoryImage: Record<string, string> = {
    "men's clothing": '/img/category-men.jpg',
    jewelery: '/img/category-jewelery.jpg',
    "women's clothing": '/img/category-women.jpg',
  };

  return (
    <>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 480px)',
          backgroundImage: `url(${
            categoryImage[category as keyof typeof categoryImage]
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Stack
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: isDesktop ? 'flex-start' : 'center',
          justifyContent: 'center',
          padding: isDesktop ? '4rem 4rem 8rem 4rem' : '3rem',
        }}
      >
        {!isDesktop && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(productDetail);
            }}
            sx={{
              color: '#d1d1d1',
              marginLeft: 'auto',
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        )}
        <CardMedia
          component='img'
          image={image}
          alt={`${title} image`}
          sx={{
            marginRight: isDesktop ? '1rem' : 0,
            marginTop: isDesktop ? '2.5rem' : 0,
            height: 200,
            width: isDesktop ? '286px' : '100%',
            objectFit: 'contain',
          }}
        />
        <Stack maxWidth='390px'>
          {isDesktop && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(productDetail);
              }}
              sx={{
                color: '#d1d1d1',
                marginLeft: 'auto',
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          )}
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {title}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                textAlign: 'justify',
                mb: '0.75rem',
              }}
            >
              {description}
            </Typography>
            <Typography variant='h6'>${price}</Typography>
          </CardContent>
          <CardActions sx={{ height: '56px' }}>
            {quantity > 0 ? (
              <Box
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              >
                <IconButton
                  onClick={() => increaseQuantity(productDetail?.id)}
                  aria-label='increase quantity'
                  disabled={quantity >= 5}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  onClick={() => decreaseQuantity(productDetail?.id)}
                  aria-label='remove product'
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                size='small'
                color='success'
                aria-label='add product'
                onClick={() => addToBag(productDetail)}
                sx={{ width: '100%', color: '#a4a277' }}
              >
                Add to bag
              </Button>
            )}
          </CardActions>
        </Stack>
      </Stack>
    </>
  );
};

export default ProductDetail;
