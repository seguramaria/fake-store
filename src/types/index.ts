export type Data = {
  name: string;
  icon: string;
  products: Product[];
};

export type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
  title: string;
};
