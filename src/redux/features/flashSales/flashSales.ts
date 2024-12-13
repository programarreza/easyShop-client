import { baseApi } from "../../api/baseApi";

export const flashSalesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFlashSales: builder.mutation({
      query: (flashSalesInfo) => ({
        url: `/flash-sales/create`,
        method: "POST",
        body: flashSalesInfo,
      }),
    }),
  }),
});

export const { useCreateFlashSalesMutation } = flashSalesApi;
