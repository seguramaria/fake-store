import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from './ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Icon } from '@mui/material';
import { Product } from '../types';

type Props = {
  cart: Product[];
  clearCart: () => void;
  decreaseQuantity: (id: number) => void;
  icon: string;
  increaseQuantity: (id: number) => void;
  name: string;
  removeProductFromCart: (id: number) => void;
};

const Header = ({
  cart,
  clearCart,
  decreaseQuantity,
  icon,
  increaseQuantity,
  name,
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
        <Button
          variant='text'
          color='inherit'
          href='/'
          sx={{ width: '100%', justifyContent: 'flex-start' }}
        >
          {icon && (
            <Icon
              className='material-icons-outlined'
              color='inherit'
              sx={{ marginRight: '0.5rem' }}
            >
              {icon}
            </Icon>
          )}
          {/* <Typography component='div' variant={isDesktop ? 'h5' : 'body1'}>
            {name}
          </Typography> */}
        </Button>

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
