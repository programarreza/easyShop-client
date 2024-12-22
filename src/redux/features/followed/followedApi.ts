import { baseApi } from "../../api/baseApi";

export const followedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFollow: builder.mutation({
      query: (followInfo) => ({
        url: `/followed/create-follow`,
        method: "POST",
        body: followInfo,
      }),

      invalidatesTags: ["shop"],
    }),
  }),
});

export const { useCreateFollowMutation } = followedApi;
