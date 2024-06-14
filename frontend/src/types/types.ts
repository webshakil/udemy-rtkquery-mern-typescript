export type User ={
    name?: string;
    email:string;
    password:string;
    phone?:string| null;
    photo?:string;
    role?:string;
    token?:string;
    isBanned?:boolean
}
export type Product={
    name: string;
    price: number;
    stock: number;
    category:string;
    photo:string;
    _id:string
}
export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  
  export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };