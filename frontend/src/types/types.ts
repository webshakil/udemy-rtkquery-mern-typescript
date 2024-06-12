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