import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
} from "../../types/api-types";
import { RootState } from "../store";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.userReducer.token;
      if (token) {
        headers.set('Authorization', token);
      }
      //headers.set("Origin", "http://localhost:5173/"); 
      
      return headers;
    },

  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      
    }),
    // myOrders: builder.query<AllOrdersResponse, string>({
    //   query: (id) => `my?id=${id}`,
    //   providesTags: ["orders"],
    // }),
      myOrders: builder.query<AllOrdersResponse, string>({
        query: (id) => ({
          url: `my?id=${id}`,
          method: "GET",
        }),
      
    }),



      allOrders: builder.query<AllOrdersResponse, string>({
        query: () => ({
          url: "all",
          method: "GET",
        }),
      
    }),
    
    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (id) => id,
      
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;