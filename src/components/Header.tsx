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
import ShoppingBag from './ShoppingBag';
import useMediaQuery from '@mui/material/useMediaQuery';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import MenuIcon from '@mui/icons-material/Menu';

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
