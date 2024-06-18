import { CartItem, Order, Product, ShippingInfo, User } from "./types";

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

  export type AllUsersResponse = {
    success: boolean;
    users: User[];
    pagination?: {
      totalPages: number;
      currentPage: number;
      previousPage: number | null;
      nextPage: number | null;
      totalUsers?:number | null
    };
  };

  export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
  };
  export type OrderDetailsResponse = {
    success: boolean;
    order: Order;
  };

  export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
  };
  export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
  };
    
