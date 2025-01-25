export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Salesman {
  _id: string;
  displayName: string;
  phoneNumber: string;
}

export interface ItemMutation {
  title: string;
  description: string;
  price: number;
  image: File | null;
  category: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  image: File | null;
  price: number;
  category: string;
  user: Salesman;
}