import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),

      providesTags: ["profile"],
    }),

    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["users"],
    }),

    statusChange: builder.mutation({
      query: (args) => ({
        url: `/users/change-status/${args.userId}`,
        method: "PATCH",
        body: args.status,
      }),

      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useStatusChangeMutation,
} = authApi;
