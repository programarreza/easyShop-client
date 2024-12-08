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

    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),

      providesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: `/categories/${categoryInfo.categoryId}`,
        method: "PATCH",
        body: categoryInfo.categoryData,
      }),

      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
