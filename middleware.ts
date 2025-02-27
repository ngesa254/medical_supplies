import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public routes that don't require authentication
const publicRoutes = ["/sign-in", "/sign-up"];

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId } = auth; // Extract the user ID from auth
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the user is not signed in and the route is not public, redirect to sign-in
  if (!userId && !isPublicRoute) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is signed in and trying to access sign-in/sign-up pages, redirect to dashboard
  if (userId && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// Config for the middleware to run on all routes except static files, images, etc.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
