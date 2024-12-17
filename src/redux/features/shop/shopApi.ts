import { baseApi } from "../../api/baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (shopInfo) => ({
        url: `/shops/create-shop`,
        method: "POST",
        body: shopInfo,
      }),

      invalidatesTags: ["shops"],
    }),

    getMyShop: builder.query({
      query: () => ({
        url: `/shops/my-shop`,
        method: "GET",
      }),

      providesTags: ["shops"],
    }),

    getSingleShop: builder.query({
      query: (shopId) => ({
        url: `/shops/${shopId}`,
        method: "GET",
      }),

      providesTags: ["shop"],
    }),

    updateMyShop: builder.mutation({
      query: (shopData) => ({
        url: `/shops/my-shop`,
        method: "PATCH",
        body: shopData,
      }),

      invalidatesTags: ["shops"],
    }),

    getAllShops: builder.query({
      query: () => ({
        url: `/shops`,
        method: "GET",
      }),

      providesTags: ["allShop"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetMyShopQuery,
  useUpdateMyShopMutation,
  useGetSingleShopQuery,
  useGetAllShopsQuery,
} = shopApi;
