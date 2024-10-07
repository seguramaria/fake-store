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
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation';
import ShoppingBag from '../shoppingBag/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
  bag: Product[];
  bagIsEmpty: boolean;
  bagTotal: number;
  clearBag: () => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  removeProductFromBag: (id: number) => void;
};

const Header = ({
  bag,
  bagIsEmpty,
  bagTotal,
  clearBag,
  decreaseQuantity,
  increaseQuantity,
  removeProductFromBag,
}: Props) => {
  const [isBagOpen, setIsBagOpen] = useState(false);
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
            onClick={() => setIsBagOpen(true)}
            sx={{
              '&:hover': {
                backgroundColor: 'white',
                borderColor: 'none',
              },
            }}
          >
            ({bag?.length})
          </Button>
          <Drawer
            anchor='right'
            open={isBagOpen}
            onClose={() => setIsBagOpen(false)}
          >
            <ShoppingBag
              bag={bag}
              bagIsEmpty={bagIsEmpty}
              bagTotal={bagTotal}
              clearBag={clearBag}
              close={() => setIsBagOpen(false)}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              removeProductFromBag={removeProductFromBag}
            />
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
