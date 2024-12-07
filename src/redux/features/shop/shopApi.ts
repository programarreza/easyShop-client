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

    updateMyShop: builder.mutation({
      query: (shopData) => ({
        url: `/shops/my-shop`,
        method: "PATCH",
        body: shopData,
      }),

      invalidatesTags: ["shops"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetMyShopQuery,
  useUpdateMyShopMutation,
} = shopApi;
