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