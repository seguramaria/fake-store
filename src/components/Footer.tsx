import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';

type Props = {
  icon: string;
  name: string;
};

const Footer = ({ icon, name }: Props) => {
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
      {/* <Typography variant='body2'>
        © {new Date().getFullYear()} {name}
      </Typography> */}
      {icon && (
        <Icon
          className='material-icons-outlined'
          color='inherit'
          sx={{ marginLeft: '0.5rem' }}
        >
          {icon}
        </Icon>
      )}
    </Box>
  );
};

export default Footer;
