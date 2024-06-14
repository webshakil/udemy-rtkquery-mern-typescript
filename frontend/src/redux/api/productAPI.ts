import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  MessageResponse,
  ProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
} from "../../types/api-types";
import { RootState } from "../store";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
    
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.userReducer.token;
        if (token) {
          headers.set('Authorization', token);
        }
        headers.set("Origin", "http://localhost:5173/"); 
        
        return headers;
      },
  }),
 
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",     
    }),
  
     allProducts: builder.query<AllProductsResponse, string>({
      query: () => "all-products",
      
    }),

    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
    }),

    newProduct: builder.mutation<MessageResponse, FormData>({
      query: ( formData ) => ({
        url: "new",
        method: "POST",
        body: formData,
      }),
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
     
    }),
//http://localhost:9000/api/v1/product/all?search=laptop&page=1&price=1000&sort=asc&category=electronics
    searchProducts: builder.query<SearchProductsResponse,SearchProductsRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      
    }),
 
    updateProduct: builder.mutation<MessageResponse, {formData: FormData; productId:string}>({
      query: ({ formData,productId }) => ({
        url: productId,
        method: "PUT",
        body: formData,
      }),
     
    }),

    deleteProduct: builder.mutation<MessageResponse, {productId: string}>({
      query: ({productId }) => ({
        url: productId,
        method: "DELETE",
      }),
     
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;