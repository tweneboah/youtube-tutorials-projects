import { NextResponse } from "next/server";

export async function middleware(request) {
  // Get the pathname of the request (e.g. /dashboard)
  const path = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = [
    "/dashboard",
    "/api/enquiries",
    "/properties/add",
    "/properties/:id/edit",
  ];

  // Public routes that should bypass auth
  const publicRoutes = ["/properties", "/api/properties"];

  // Check if the path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // Allow public routes to bypass auth
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Add token to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("Authorization", `Bearer ${token}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Update the matcher to include all protected paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/enquiries/:path*",
    "/properties/add",
    "/properties/:id/edit",
  ],
};
