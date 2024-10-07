import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Typography from '@mui/material/Typography';

type Props = {
  addToBag: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  product: Product;
  quantity: number;
};

const ProductCard = ({
  addToBag,
  increaseQuantity,
  product,
  quantity,
  decreaseQuantity,
}: Props) => {
  const { image, title, price } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  return (
    <Card
      sx={{
        width: 270,
        height: 348,
        padding: '0.5rem',
        position: 'relative',
        marginBottom: '2rem',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <Button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 1,
          color: '#d1d1d1',
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Button>

      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <CardActionArea
          sx={{
            padding: '0.5rem',
          }}
        >
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
            onClick={() => addToBag(product)}
            sx={{ width: '100%', color: '#a4a277' }}
          >
            Add to bag
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
