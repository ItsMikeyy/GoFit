import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  const onboardingCompleted = token.user?.onboardingCompleted;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/welcome") && onboardingCompleted) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); 
  }

  if (!onboardingCompleted && !pathname.startsWith("/welcome")) {
    return NextResponse.redirect(new URL("/welcome", req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/welcome"], 
};