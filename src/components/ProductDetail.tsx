import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Product } from '../types';

type Props = {
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  product: Product;
  quantity: number;
  handleClose: () => void;
  open: boolean;
};

const ProductDetail = ({
  addToCart,
  handleClose,
  open,
  product,
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: Props) => {
  const { image, price, description, title } = product;
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <Dialog open={open} onClose={handleClose}>
      {!isDesktop && (
        <IconButton
          color='inherit'
          onClick={handleClose}
          sx={{
            top: 6,
            right: 10,
            position: 'absolute',
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent>
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
              <Typography variant='h6'>{price}$</Typography>
            </CardContent>
            <CardActions>
              {quantity > 0 ? (
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
                >
                  Add to cart
                </Button>
              )}
            </CardActions>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
