import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store/store";

import envConfig from "@/src/config/envConfig";
import { setCookie } from "@/src/utils/cookiesUtils";

interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${envConfig.baseApi}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
      setCookie("accessToken", token, { maxAge: 3600 });
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // Narrowing the type for error response
  const error = result?.error as ErrorResponse | undefined;

  if (error?.status === 404) {
    toast.error(error?.data?.message);
  }

  if (error?.status === 401) {
    // Send Refresh Token
    console.log("Sending refresh token");

    const res = await fetch(`${envConfig.baseApi}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      if (user) {
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "profile",
    "categories",
    "users",
    "shops",
    "myShopProducts",
    "products",
    "shop",
    "myFlashSalesProducts",
    "FlashSalesProducts",
    "customerOrdersHistory",
    "myCustomersOrdersHistory",
    "shopsOrdersHistory",
    "myReviews",
    "myProductReviews",
    "allShop",
  ],
  endpoints: () => ({}),
});
