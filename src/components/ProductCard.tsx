import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Product } from '../types';

type Props = {
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  product: Product;
  quantity: number;
};

const ProductCard = ({
  addToCart,
  increaseQuantity,
  product,
  quantity,
  decreaseQuantity,
}: Props) => {
  const { image, title, price } = product;

  return (
    <Card
      sx={{
        width: 270,
        height: 336,
        padding: '0.5rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <CardActionArea>
          <CardMedia
            component='img'
            image={image}
            alt={`${title} image`}
            sx={{
              height: 200,
              objectFit: 'contain',
              width: '100%',
            }}
          />

          <CardContent sx={{ paddingBottom: '0' }}>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ height: '3.5rem' }}>
        {quantity > 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
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
            onClick={() => addToCart(product)}
            sx={{ width: '100%', color: '#a4a277' }}
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
