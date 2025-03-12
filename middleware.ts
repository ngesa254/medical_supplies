import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedPaths = [
  "/account",
  "/chat",
  "/compare-quotes",
  "/integration-setup",
  "/product-feedback",
  "/request-quote",
  "/supply-exchange",
];

// Auth routes that signed-in users shouldn't access
const authRoutes = ["/sign-in", "/sign-up"];

// Function to check if a path is protected
function isProtectedPath(path: string) {
  return protectedPaths.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
}

// Function to check if a path is an auth route
function isAuthRoute(path: string) {
  return authRoutes.includes(path);
}

// Create a middleware handler that will be wrapped by clerkMiddleware
const customMiddleware = (auth, req) => {
  // Get the current path
  const path = req.nextUrl.pathname;

  // If user is signed in and trying to access an auth route, redirect to home
  if (auth.userId && isAuthRoute(path)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is not signed in and trying to access a protected route, redirect to sign-in
  if (!auth.userId && isProtectedPath(path)) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirect_url", path);
    return NextResponse.redirect(redirectUrl);
  }

  // For all other cases, continue with the request
  return NextResponse.next();
};

// Export the middleware wrapped with clerkMiddleware
export default clerkMiddleware(customMiddleware);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
