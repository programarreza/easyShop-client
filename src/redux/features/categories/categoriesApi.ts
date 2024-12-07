import { baseApi } from "../../api/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/categories/create-category",
        method: "POST",
        body: categoryInfo,
      }),
    }),
  }),
});

export const { useCreateCategoryMutation } = categoriesApi;
