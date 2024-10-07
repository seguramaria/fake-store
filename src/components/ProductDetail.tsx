import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Product } from '../types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === product?.id);

  const isDesktop = useMediaQuery('(min-width:600px)');
  const quantity = product ? getProductQuantity(product?.id) : 0;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const { image, price, description, title, category } = product;

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
          color: 'white',
          textAlign: 'center',
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
              toggleFavorite(product);
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
                toggleFavorite(product);
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
                  onClick={() => increaseQuantity(product.id)}
                  aria-label='increase quantity'
                  disabled={quantity >= 5}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  onClick={() => decreaseQuantity(product.id)}
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
                onClick={() => addToBag(product)}
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
