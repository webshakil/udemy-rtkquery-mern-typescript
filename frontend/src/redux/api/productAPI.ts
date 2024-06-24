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
  tagTypes:["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest", 
      providesTags:["product"]
    }),
  
     allProducts: builder.query<AllProductsResponse, string>({
      query: () => "all-products",
      providesTags:["product"]
    }),

    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags:["product"]
    }),

    newProduct: builder.mutation<MessageResponse, FormData>({
      query: ( formData ) => ({
        url: "new",
        method: "POST",
        body: formData,
      }),
     invalidatesTags:["product"]
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags:["product"]
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
      providesTags:["product"]
    }),
 
    updateProduct: builder.mutation<MessageResponse, {formData: FormData; productId:string}>({
      query: ({ formData,productId }) => ({
        url: productId,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags:["product"]


    }),

    deleteProduct: builder.mutation<MessageResponse, {productId: string}>({
      query: ({productId }) => ({
        url: productId,
        method: "DELETE",
      }),
      invalidatesTags:["product"]
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