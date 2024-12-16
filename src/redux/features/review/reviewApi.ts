import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: `/reviews/create-review`,
        method: "POST",
        body: reviewInfo,
      }),

      invalidatesTags: ["myReviews", "myProductReviews"],
    }),

    getMyReviews: builder.query({
      query: () => ({
        url: `/reviews/me`,
        method: "GET",
      }),

      providesTags: ["myReviews"],
    }),

    getMyProductReviews: builder.query({
      query: () => ({
        url: `/reviews/my-product-reviews`,
        method: "GET",
      }),

      providesTags: ["myProductReviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useGetMyProductReviewsQuery,
} = reviewApi;
