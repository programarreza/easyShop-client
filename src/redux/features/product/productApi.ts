import { baseApi } from "../../api/baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: `/products/create-product`,
        method: "POST",
        body: productInfo,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = shopApi;
