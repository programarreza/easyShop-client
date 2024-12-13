import { baseApi } from "../../api/baseApi";

export const flashSalesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // done
    createFlashSales: builder.mutation({
      query: (flashSalesInfo) => ({
        url: `/products/flash-sales-create`,
        method: "POST",
        body: flashSalesInfo,
      }),
    }),

    // done
    getMyFlashSalesProducts: builder.query({
      query: () => ({
        url: `/products/my-flash-sales-products`,
        method: "GET",
      }),

      providesTags: ["myFlashSalesProducts"],
    }),

    // done
    getAllFlashSalesProducts: builder.query({
      query: () => ({
        url: `/products/flash-sales-products`,
        method: "GET",
      }),

      providesTags: ["FlashSalesProducts"],
    }),

    // done
    deleteMyFlashSalesProducts: builder.mutation({
      query: (id) => ({
        url: `/products/my-flash-sales-products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["myFlashSalesProducts"],
    }),
  }),
});

export const {
  useCreateFlashSalesMutation,
  useGetMyFlashSalesProductsQuery,
  useGetAllFlashSalesProductsQuery,
  useDeleteMyFlashSalesProductsMutation,
} = flashSalesApi;
