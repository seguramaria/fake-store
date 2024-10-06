import { useEffect, useState, useMemo } from 'react';
import { Product } from '../types';

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);
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
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev: Product[]) => [...prev, { ...product, quantity: 1 }]);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = cart.filter((item: Product) => item.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item: Product) => {
      if (item.id === id && item.quantity) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
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

    setCart(updatedCart);
  };

  const clearCart = () => setCart([]);

  const getProductQuantity = (productId: number) => {
    const productInCart = cart.find((item: Product) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  const cartIsEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total: number, product: Product) =>
          total + (product.quantity || 0) * product.price,
        0
      ),
    [cart]
  );
  return {
    addToCart,
    cart,
    cartIsEmpty,
    cartTotal,
    clearCart,
    decreaseQuantity,
    getProductQuantity,
    increaseQuantity,
    isLoading,
    products,
    removeProductFromCart,
  };
};
