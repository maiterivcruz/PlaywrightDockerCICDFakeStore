export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
}

export interface UserName {
  firstname: string;
  lastname: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}

export interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  address: UserAddress;
  phone: string;
}

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  id?: number;
  userId: number;
  date: string;
  products: CartProduct[];
  __v?: number;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
