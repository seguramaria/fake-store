import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Product } from '../types';

type Props = {
  product: Product;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  removeProductFromCart: (id: number) => void;
};

const ShoppingCartItem = ({
  decreaseQuantity,
  increaseQuantity,
  product,
  removeProductFromCart,
}: Props) => {
  const { image, title, price, quantity } = product;

  return (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        marginBottom: '0.5rem',
        position: 'relative',
        padding: '0.5rem',
      }}
    >
      <IconButton
        size='small'
        onClick={() => removeProductFromCart(product.id)}
        aria-label='remove product'
        sx={{ position: 'absolute', right: '2px' }}
      >
        <DeleteIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image={image}
        alt={`${title} image`}
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: '1rem',
              marginTop: '0.85rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
            ${price}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => increaseQuantity(product.id)}
            aria-label='increase quantity'
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton
            onClick={() => decreaseQuantity(product.id)}
            aria-label='decrease quantity'
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ShoppingCartItem;
