import { baseApi } from "../../api/baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: `/products/create-product`,
        method: "POST",
        body: productInfo,
      }),

      invalidatesTags: ["myShopProducts"],
    }),

    getAllProducts: builder.query({
      query: ({ page, limit }) => ({
        url: `/products?page=${page}&limit=${limit}`,
        method: "GET",
      }),

      providesTags: ["products"],
    }),

    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    getMyShopProducts: builder.query({
      query: () => ({
        url: `/products/my-products`,
        method: "GET",
      }),

      providesTags: ["myShopProducts"],
    }),

    updateMyShopProduct: builder.mutation({
      query: (args) => ({
        url: `/products/${args.productId}`,
        method: "PATCH",
        body: args.productData,
      }),

      invalidatesTags: ["myShopProducts"],
    }),

    deleteMyShopProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["myShopProducts"],
    }),

    getRelevantProducts: builder.mutation({
      query: (categoriesData) => ({
        url: `/products/relevant-products`,
        method: "POST",
        body: categoriesData,
      }),

      invalidatesTags: ["myShopProducts"],
    }),

    compareProducts: builder.mutation({
      query: (productIds) => ({
        url: `/products/compare`,
        method: "POST",
        body: productIds,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetMyShopProductsQuery,
  useUpdateMyShopProductMutation,
  useDeleteMyShopProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetRelevantProductsMutation,
  useCompareProductsMutation,
} = shopApi;
