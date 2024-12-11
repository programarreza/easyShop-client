import { baseApi } from "../../api/baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (couponInfo) => ({
        url: "/coupons/create-coupon",
        method: "POST",
        body: couponInfo,
      }),
    }),

    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: "/coupons",
        method: "DELETE",
      }),
      invalidatesTags: ["shop", "profile"]
    }),
  }),
});

export const { useCreateCouponMutation, useDeleteCouponMutation } = couponApi;
