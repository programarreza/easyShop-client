import { baseApi } from "../../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: `/reviews/create-review`,
        method: "POST",
        body: reviewInfo,
      }),
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;
