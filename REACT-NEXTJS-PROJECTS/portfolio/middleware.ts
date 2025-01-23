import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname === "/auth/signin";
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    // If user is on auth page and is logged in, redirect to dashboard
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is trying to access dashboard without admin role
    if (isOnDashboard && (!token?.role || token.role !== "admin")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public access to signin page
        if (req.nextUrl.pathname === "/auth/signin") {
          return true;
        }
        // Require auth for dashboard
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        // Allow access to other pages
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
