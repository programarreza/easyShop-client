import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./services/authService";
const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  ADMIN: [/^\/admin-dashboard/, /^\/admin-dashboard\/.*/],
  VENDOR: [/^\/vendor-dashboard/, /^\/vendor-dashboard\/.*/],
  CUSTOMER: [/^\/dashboard/, /^\/dashboard\/.*/, /^\/cart/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
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
    "/payment-successful",
    "/payment-failed",
  ],
};
