export interface Product {
  id: number;
  price: number;
  title: string;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}
