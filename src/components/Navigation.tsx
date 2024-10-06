import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  closeMenu: () => void;
  isOpenNavigationMenu: boolean;
};

const Navigation = ({ closeMenu, isOpenNavigationMenu }: Props) => {
  const categoryItemMenuInfo = {
    favorite: {
      title: 'Favorites',
      link: '/',
    },
    men: {
      title: 'Men',
      link: "/category/men's clothing",
    },
    jewelery: {
      title: 'Jewelery',
      link: '/category/jewelery',
    },
    women: {
      title: 'Women',
      link: "/category/women's clothing",
    },
    info: {
      title: 'Info',
      link: '/info',
    },
  };
  return (
    <Drawer open={isOpenNavigationMenu} onClose={closeMenu}>
      <Box
        sx={{
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        }}
        role='presentation'
        onClick={closeMenu}
      >
        <List>
          {(
            Object.keys(categoryItemMenuInfo) as Array<
              keyof typeof categoryItemMenuInfo
            >
          )
            .filter((key) => key !== 'info')
            .map((key) => {
              const { title, link } = categoryItemMenuInfo[key];
              return (
                <ListItem key={title} disablePadding>
                  <ListItemButton component={Link} to={link}>
                    <ListItemText primary={title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>

        <List>
          <Divider />
          <ListItem key='info' disablePadding>
            <ListItemButton
              component={Link}
              to={categoryItemMenuInfo.info.link}
            >
              <ListItemText primary={categoryItemMenuInfo.info.title} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Navigation;
