import { baseApi } from "../../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/orders/create-order`,
        method: "POST",
        body: orderInfo,
      }),

      invalidatesTags: ["customerOrdersHistory"],
    }),

    getCustomerOrdersHistory: builder.query({
      query: () => ({
        url: `/orders/customer-history`,
        method: "GET",
      }),

      providesTags: ["customerOrdersHistory"],
    }),

    getMyCustomerOrdersHistory: builder.query({
      query: () => ({
        url: `/orders/my-customer-history`,
        method: "GET",
      }),

      providesTags: ["myCustomersOrdersHistory"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetCustomerOrdersHistoryQuery,
  useGetMyCustomerOrdersHistoryQuery,
} = orderApi;
