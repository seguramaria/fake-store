import { useEffect, useState } from 'react';
import { Product } from '../types';

export const useFecthData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  // const [productDetail, setProductDetail] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('API response error');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchProductDetail = async ({ id }) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  //     if (!response.ok) {
  //       throw new Error('Error fetching product details');
  //     }
  //     const data = await response.json();
  //     setProductDetail(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProductDetail(id);
  // }, [id]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    isLoading,
    // productDetail,
    products,
  };
};
