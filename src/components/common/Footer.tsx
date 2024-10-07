import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import { IconButton, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Stack
      component='footer'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        padding: '16px',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <IconButton
          href={'https://github.com/seguramaria'}
          target='_blank'
          aria-label='Go to git hub profile'
        >
          <GitHubIcon sx={{ fontSize: 20, color: '#373330' }} />
        </IconButton>
        <IconButton
          href={'https://www.linkedin.com/in/seguramaria/'}
          target='_blank'
          aria-label='Go to linkedin profile'
        >
          <LinkedInIcon sx={{ fontSize: 20, color: '#373330' }} />
        </IconButton>
        <IconButton
          href={'https://x.com/MariaesSegura/'}
          target='_blank'
          aria-label='Go to twitter profile'
        >
          <TwitterIcon sx={{ fontSize: 20, color: '#373330' }} />
        </IconButton>
        <IconButton
          href={'https://seguramaria.com/'}
          target='_blank'
          aria-label='Go to my personal web'
        >
          <AccountBoxOutlinedIcon sx={{ fontSize: 20, color: '#373330' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='body2'>
          © {new Date().getFullYear()} Fake Store
        </Typography>
      </Box>
    </Stack>
  );
};

export default Footer;
