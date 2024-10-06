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
    contact: {
      title: 'Contact',
      link: '/',
    },
  };
  return (
    <Drawer open={isOpenNavigationMenu} onClose={closeMenu}>
      <Box sx={{ width: 250 }} role='presentation' onClick={closeMenu}>
        <List>
          {(
            Object.keys(categoryItemMenuInfo) as Array<
              keyof typeof categoryItemMenuInfo
            >
          )
            .filter((key) => key !== 'contact')
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

        <Divider />

        <List>
          <ListItem key='contact' disablePadding>
            <ListItemButton
              component={Link}
              to={categoryItemMenuInfo.contact.link}
            >
              <ListItemText primary={categoryItemMenuInfo.contact.title} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Navigation;
