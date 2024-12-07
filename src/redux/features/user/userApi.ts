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
  }),
});

export const { useGetProfileQuery } = authApi;
