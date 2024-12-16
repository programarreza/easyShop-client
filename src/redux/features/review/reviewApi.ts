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

    replayMyProductReview: builder.mutation({
      query: (replayData) => ({
        url: `/reviews/my-product-reviews/replay`,
        method: "POST",
        body: replayData,
      }),

      invalidatesTags: ["myReviews", "myProductReviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useGetMyProductReviewsQuery,
  useReplayMyProductReviewMutation,
} = reviewApi;
