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

type Props = {
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  getProductQuantity: (productId: number) => number;
};

const ProductDetail = ({
  addToCart,
  getProductQuantity,
  decreaseQuantity,
  increaseQuantity,
}: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  const { image, price, description, title } = product;
  return (
    <Stack
      sx={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '1.5rem',
      }}
    >
      <CardMedia
        component='img'
        height='350'
        image={image}
        alt={`${title} image`}
      />
      <Stack>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', textAlign: 'justify' }}
          >
            {description}
          </Typography>
          <Typography variant='h6'>${price}</Typography>
        </CardContent>
        <CardActions>
          {quantity > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
              onClick={() => addToCart(product)}
              sx={{ width: '100%' }}
            >
              Add to cart
            </Button>
          )}
        </CardActions>
      </Stack>
    </Stack>
  );
};

export default ProductDetail;
