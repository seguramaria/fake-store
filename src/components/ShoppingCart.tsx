import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ShoppingCartItem from './ShoppingCartItem';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Button, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Product } from '../types';

type Props = {
  cart: Product[];
  cartIsEmpty: boolean;
  cartTotal: number;
  clearCart: () => void;
  close: () => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  removeProductFromCart: (id: number) => void;
};

const ShoppingCart = ({
  cart,
  cartIsEmpty,
  cartTotal,
  clearCart,
  close,
  decreaseQuantity,
  increaseQuantity,
  removeProductFromCart,
}: Props) => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Stack
        sx={{
          width: isDesktop ? 400 : '100vw',
          height: '100%',
          padding: '1.5rem',
          paddingBottom: '0.25rem',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {!isDesktop && (
          <IconButton
            color='inherit'
            onClick={() => close()}
            sx={{
              top: '0.25rem',
              right: '0.5rem',
              position: 'absolute',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {cartIsEmpty ? (
          <Stack
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h6' paddingTop='0.75rem'>
              YOUR CART IS EMPTY
            </Typography>
          </Stack>
        ) : (
          <Stack
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              paddingBottom: '110px',
            }}
          >
            <Typography variant='h6' paddingBottom='1rem'>
              Shopping Cart ({cart.length})
            </Typography>
            {cart.map((product) => (
              <ShoppingCartItem
                key={product.id}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                product={product}
                removeProductFromCart={removeProductFromCart}
              />
            ))}
          </Stack>
        )}
      </Stack>
      <Stack
        sx={{
          width: isDesktop ? 400 : '100vw',
          padding: '1rem',
          position: 'fixed',
          backgroundColor: 'white',
          bottom: 0,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography>Total:</Typography>
            <Typography>{cartTotal}$</Typography>
          </Stack>
          <ShoppingBagOutlinedIcon
            fontSize='medium'
            sx={{ margin: '0 0 0.3rem 0.5rem' }}
          />
        </Stack>
        {!cartIsEmpty && (
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => clearCart()}
            sx={{ width: '100%', marginTop: '0.75rem' }}
          >
            Clear Cart
          </Button>
        )}
      </Stack>
    </>
  );
};

export default ShoppingCart;
