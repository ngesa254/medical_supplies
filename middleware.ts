import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Example: Check if the user is authenticated
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'],
};