import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/register' || path === '/'

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/todo', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/todo/:path*", "/login", "/register", "/"],
};
