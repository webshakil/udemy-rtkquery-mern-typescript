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
  tagTypes:["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
    invalidatesTags:["order"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags:["order"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags:["order"],
    }),
   
      myOrders: builder.query<AllOrdersResponse, string>({
        query: (id) => ({
          url: `my?id=${id}`,
          method: "GET",
        }),
      providesTags:["order"]
    }),



      allOrders: builder.query<AllOrdersResponse, string>({
        query: () => ({
          url: "all",
          method: "GET",
        }),
      providesTags:["order"]
    }),
    
    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (id) => id,
      providesTags:["order"]
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