// import type { NextRequest } from "next/server";

// import { NextResponse } from "next/server";

// import { getCurrentUser } from "./services/authService";

// type TRole = "CUSTOMER" | "ADMIN" | "VENDOR";

// const AuthRoutes = ["/login", "/register"];
// const roleBaseRoute = {
//   customer: [/^\/CUSTOMER/],
//   admin: [/^\/ADMIN/],
//   vendor: [/^\/VENDOR/],
//   // common: [/^\/profile/], // common route for both users and admins
// };

// // type TRole = keyof typeof roleBaseRoute;

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Fetch the current user
//   const user = await getCurrentUser();

//   console.log("user", user);

//   // Check if user is not authenticated and request is for Auth routes
//   if (!user) {
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     }

//     // Redirect to login if not authenticated
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }

//   // If the user is authenticated, check their role and allow access accordingly
//   const userRole = user?.role as TRole;

//   if (userRole && roleBaseRoute[userRole]) {
//     const routes = roleBaseRoute[userRole];

//     // Check if the requested route matches user/admin-specific or common routes
//     if (
//       routes.some((route) => route.test(pathname)) ||
//       roleBaseRoute.common.some((route) => route.test(pathname)) // allow access to `/profile/:page*` for both
//     ) {
//       return NextResponse.next();
//     }

//     // Redirect to homepage if trying to access unauthorized routes
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Default case: if none of the conditions match, redirect to home
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     // "/profile/:page*",
//     "/customer/:page*",
//     "/admin/:page*",
//     "/vendor/:page*",
//     "/products",
//     "/login",
//     "/register",
//   ],
// };

// import { NextRequest, NextResponse } from "next/server";

// import { getCurrentUser } from "./services/authService";

// // Define public routes accessible to everyone
// const PublicRoutes = ["/", "/product/:id", "/login", "/register"];

// // Role-based routes for access control
// const roleBasedRoutes = {
//   ADMIN: [/^\/admin-dashboard/, /^\/admin-dashboard\/.*/],
//   VENDOR: [/^\/vendor-dashboard/, /^\/vendor-dashboard\/.*/],
//   CUSTOMER: [/^\/dashboard/, /^\/dashboard\/.*/, /^\/cart/, /^\/flash-sales/],
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Allow public routes
//   if (PublicRoutes.some((route) => new RegExp(`^${route}$`).test(pathname))) {
//     console.log("Public route allowed:", pathname);

//     return NextResponse.next();
//   }

//   // Fetch user data
//   const user = await getCurrentUser();
//   console.log(user)

//   if (!user) {
//     console.log("User is not authenticated, redirecting to login...");

//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }

//   // Role-based access control
//   const allowedRoutes =
//     roleBasedRoutes[user.role as keyof typeof roleBasedRoutes];

//   if (allowedRoutes && allowedRoutes.some((route) => route.test(pathname))) {
//     console.log("Authorized Access for role:", user.role);

//     return NextResponse.next();
//   }

//   console.log("Unauthorized access detected. Redirecting...");

//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/admin-dashboard/:path*",
//     "/vendor-dashboard/:path*",
//     "/dashboard/:path*",
//     "/cart",
//     "/flash-sales",
//     "/payment-successful",
//     "/payment-failed",
//     "/products",
//     "/shop",
//   ],
// };

// ----------------------------------------------------
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./services/authService";
// import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  ADMIN: [/^\/admin-dashboard/, /^\/admin-dashboard\/.*/],
  VENDOR: [/^\/vendor-dashboard/, /^\/vendor-dashboard\/.*/],
  CUSTOMER: [/^\/dashboard/, /^\/dashboard\/.*/, /^\/cart/, /^\/flash-sales/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  console.log("user 161", user)

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/vendor-dashboard/:path*",
    "/dashboard/:path*",
    "/cart",
    "/flash-sales",
    "/payment-successful",
    "/payment-failed",
    "/shop",
  ],
};
