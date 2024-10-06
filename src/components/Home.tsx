import { Stack, Typography } from '@mui/material';
import { Product } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
  isLoading: boolean;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getProductQuantity: (productId: number) => number;
};

function Home({ products }: Props) {
  const categoryImage: {
    "men's clothing": string;
    jewelery: string;
    "women's clothing": string;
  } = {
    "men's clothing": './public/img/men.jpg',
    jewelery: './public/img/jewelery.jpg',
    "women's clothing": './public/img/women.jpg',
  };

  const categoriesWithImages = products.reduce(
    (group: { [key: string]: { categoryImage: string } }, product) => {
      const { category } = product;
      if (category !== 'electronics' && !group[category]) {
        group[category] = {
          categoryImage: categoryImage[category as keyof typeof categoryImage],
        };
      }
      return group;
    },
    {}
  );

  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {Object.entries(categoriesWithImages).map(([category]) => (
        <Stack
          key={category}
          component={Link}
          to={`/category/${category}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 'calc(100vh - 40px)',
            backgroundImage: `url(${
              categoryImage[category as keyof typeof categoryImage]
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <Typography variant='h3' sx={{ mb: 2.5 }}>
            {category.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>Discover more</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default Home;
