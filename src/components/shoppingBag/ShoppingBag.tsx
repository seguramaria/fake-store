import { Button, Stack, Typography } from '@mui/material';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ShoppingBagItem from './ShoppingBagItem';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
  bag: Product[];
  bagIsEmpty: boolean;
  bagTotal: number;
  clearBag: () => void;
  close: () => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
  removeProductFromBag: (id: number) => void;
};

const ShoppingBag = ({
  bag,
  bagIsEmpty,
  bagTotal,
  clearBag,
  close,
  decreaseQuantity,
  increaseQuantity,
  removeProductFromBag,
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
        {bagIsEmpty ? (
          <Stack
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h6' paddingTop='0.75rem'>
              YOUR BAG IS EMPTY
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
              Shopping Bag ({bag.length})
            </Typography>
            {bag.map((product) => (
              <ShoppingBagItem
                key={product.id}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                product={product}
                removeProductFromBag={removeProductFromBag}
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
            <Typography>${bagTotal}</Typography>
          </Stack>
          <ShoppingBagOutlinedIcon
            fontSize='medium'
            sx={{ margin: '0 0 0.3rem 0.5rem' }}
          />
        </Stack>
        {!bagIsEmpty && (
          <>
            <Button
              variant='contained'
              component={Link}
              to='/info'
              sx={{
                width: '100%',
                marginTop: '0.75rem',
                backgroundColor: '#373330',
                '&:hover': {
                  backgroundColor: 'grey',
                },
              }}
            >
              Go To Checkout
            </Button>
            <Button
              color='inherit'
              onClick={() => clearBag()}
              sx={{ width: '100%', marginTop: '0.75rem' }}
            >
              Clear Bag
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};

export default ShoppingBag;
