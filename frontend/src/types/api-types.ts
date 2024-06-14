import { Product, User } from "./types";

export type MessageResponse={
    message: string;
    user:User;
    token: string
}
export type ProductResponse={
    success: boolean;
    product:Product;
}

export type AllProductsResponse={
    success: boolean;
    products: Product[];
}

export type SearchProductsResponse = AllProductsResponse & {
    totalPage: number;
  };
  export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
  };

  export type CategoriesResponse = {
    success: boolean;
    categories: string[];
  };

  export type CustomError = {
    status: number;
    data: {
      message: string;
      success: boolean;
    };
  };