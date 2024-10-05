import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#373330',
        color: 'white',
        textAlign: 'center',
        padding: '16px',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant='body2'>
        © {new Date().getFullYear()} Fake Store
      </Typography>

      <StoreOutlinedIcon
        className='material-icons-outlined'
        color='inherit'
        sx={{ marginLeft: '0.5rem' }}
      />
    </Box>
  );
};

export default Footer;
