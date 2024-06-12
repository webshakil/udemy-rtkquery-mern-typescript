import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  MessageResponse,
  ProductResponse,
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
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;