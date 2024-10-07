import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShoppingCart from './ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import MenuIcon from '@mui/icons-material/Menu';

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
  const [isOpenNavigationMenu, setOpenNavigationMenu] = useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <AppBar position='sticky' color='inherit' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack
          sx={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div>
            <IconButton
              onClick={() => setOpenNavigationMenu(true)}
              aria-label='Open navigation menu'
            >
              <MenuIcon />
            </IconButton>
            <Navigation
              closeMenu={() => setOpenNavigationMenu(false)}
              isOpenNavigationMenu={isOpenNavigationMenu}
            />
          </div>
          <Link
            to={`/`}
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <Typography
              component='div'
              variant={isDesktop ? 'h5' : 'body1'}
              sx={{ textWrap: 'nowrap', marginLeft: '1rem' }}
            >
              Fake Store
            </Typography>{' '}
          </Link>
        </Stack>

        <Box
          sx={{
            flexBasis: { xs: '100%', md: '70%' },
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button
            color='inherit'
            startIcon={<FavoriteBorderIcon />}
            href='/favorites'
            sx={{
              '&:hover': {
                backgroundColor: 'white',
                borderColor: 'none',
              },
            }}
          />

          <Button
            color='inherit'
            startIcon={<ShoppingBagOutlinedIcon />}
            onClick={() => setIsCartOpen(true)}
            sx={{
              '&:hover': {
                backgroundColor: 'white',
                borderColor: 'none',
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
