import { useEffect, useState, useMemo } from 'react';
import { Product } from '../types';

export const useBag = () => {
  const initialBag = () => {
    const localStorageBag = localStorage.getItem('bag');
    return localStorageBag ? JSON.parse(localStorageBag) : [];
  };

  const [bag, setBag] = useState(initialBag);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('bag', JSON.stringify(bag));
  }, [bag]);

  const addToBag = (product: Product) => {
    setBag((prev: Product[]) => [...prev, { ...product, quantity: 1 }]);
  };

  const removeProductFromBag = (id: number) => {
    const updatedBag = bag.filter((item: Product) => item.id !== id);
    setBag(updatedBag);
  };

  const increaseQuantity = (id: number) => {
    const updatedBag = bag.map((item: Product) => {
      if (item.id === id && item.quantity) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBag(updatedBag);
  };

  const decreaseQuantity = (id: number) => {
    const updatedBag = bag
      .map((item: Product) => {
        if (item.id === id && item?.quantity) {
          return {
            ...item,
            quantity: item?.quantity - 1,
          };
        }
        return item;
      })
      .filter((item: Product) => item?.quantity && item.quantity > 0);

    setBag(updatedBag);
  };

  const clearBag = () => setBag([]);

  const getProductQuantity = (productId: number) => {
    const productInBag = bag.find((item: Product) => item.id === productId);
    return productInBag ? productInBag.quantity : 0;
  };

  const bagIsEmpty = useMemo(() => bag.length === 0, [bag]);
  const bagTotal = useMemo(
    () =>
      bag
        .reduce(
          (total: number, product: Product) =>
            total + (product.quantity || 0) * product.price,
          0
        )
        .toFixed(),
    [bag]
  );
  return {
    addToBag,
    bag,
    bagIsEmpty,
    bagTotal,
    clearBag,
    decreaseQuantity,
    getProductQuantity,
    increaseQuantity,
    isLoading,
    products,
    removeProductFromBag,
  };
};
