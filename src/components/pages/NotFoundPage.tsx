import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        with: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant='h3' color='inherit'>
        404
      </Typography>
      <Typography variant='body1' sx={{ mb: 3, color: 'black' }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant='contained' color='inherit' component={Link} to='/'>
        Go Back Home
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
