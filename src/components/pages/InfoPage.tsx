import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid2';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import useMediaQuery from '@mui/material/useMediaQuery';

const InfoPage = () => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 350px)',
          backgroundImage: `url("/img/info-page.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 5,
        }}
      >
        <Typography variant='h4' sx={{ mb: 2 }}>
          Hi, I'm María Segura!
        </Typography>
        {isDesktop && (
          <Typography sx={{ fontSize: '1.25rem', mb: 2 }}>
            I'm a frontend developer passionate about creating unique web
            experiences.
          </Typography>
        )}
      </Stack>

      <Grid
        container
        alignItems='center'
        justifyContent='flex-start'
        p={5}
        spacing={3}
      >
        <Grid>
          <Typography
            variant='h5'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Sorry, 'Fake Store' is fake
            <SentimentSatisfiedAltIcon color='inherit' sx={{ ml: 1 }} />
          </Typography>

          <Stack justifyContent='flex-start' alignItems='flex-start'>
            <Typography variant='body1' sx={{ maxWidth: '600px', mb: 2 }}>
              This web application is not a real web; it's a React Project. You
              can check the repository:
            </Typography>
            <Stack
              flexDirection={isDesktop ? 'row' : 'column'}
              justifyContent='space-between'
              alignItems={isDesktop ? 'flex-start' : 'center'}
              sx={{ width: '100%' }}
            >
              <Button
                variant='outlined'
                href='https://github.com/seguramaria/fake-store'
                target='_blank'
                aria-label='Go to GitHub repository'
                color='inherit'
                startIcon={
                  isDesktop && (
                    <GitHubIcon sx={{ fontSize: 16, color: '#373330' }} />
                  )
                }
                sx={{
                  width: '50%',
                  marginRight: isDesktop ? '0.5rem' : 0,
                  marginBottom: !isDesktop ? '0.5rem' : 0,
                }}
              >
                Go to GitHub
              </Button>
              <Button
                variant='outlined'
                color='inherit'
                component={Link}
                to='/'
                sx={{ width: '50%' }}
              >
                Go Back Home
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default InfoPage;
