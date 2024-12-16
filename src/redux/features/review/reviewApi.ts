import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: `/reviews/create-review`,
        method: "POST",
        body: reviewInfo,
      }),

      invalidatesTags: ["myReviews"],
    }),

    getMyReviews: builder.query({
      query: () => ({
        url: `/reviews/me`,
        method: "GET",
      }),

      providesTags: ["myReviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetMyReviewsQuery } = reviewApi;
