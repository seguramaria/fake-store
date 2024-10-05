import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from './ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Product } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  cart: Product[];
  cartIsEmpty: boolean;
  cartTotal: number;
  clearCart: () => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  removeProductFromCart: (id: number) => void;
};

const Header = ({
  cart,
  cartIsEmpty,
  cartTotal,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeProductFromCart,
}: Props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');

  const handleClickOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <AppBar position='sticky' color='inherit'>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          to={`/`}
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <StoreOutlinedIcon
              className='material-icons-outlined'
              color='inherit'
              sx={{ marginRight: '0.5rem' }}
            />
            <Typography
              component='div'
              variant={isDesktop ? 'h5' : 'body1'}
              sx={{ textWrap: 'nowrap' }}
            >
              Fake Store
            </Typography>
          </Stack>
        </Link>

        <Box
          sx={{
            flexBasis: { xs: '100%', md: '70%' },
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button
            variant='outlined'
            color='inherit'
            startIcon={<ShoppingCartIcon />}
            onClick={handleClickOpenCart}
            sx={{
              '&:hover': {
                color: 'white',
                backgroundColor: '#373330',
                borderColor: '#373330',
              },
            }}
          >
            ({cart?.length})
          </Button>
          <Drawer
            anchor='right'
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          >
            <ShoppingCart
              cart={cart}
              cartIsEmpty={cartIsEmpty}
              cartTotal={cartTotal}
              clearCart={clearCart}
              close={() => setIsCartOpen(false)}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              removeProductFromCart={removeProductFromCart}
            />
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
