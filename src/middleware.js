import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  console.log("MIDDLE")
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const onboardingCompleted = token.onboardingCompleted;
  console.log(onboardingCompleted)
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/welcome")) {
    return NextResponse.next();
  }

  if (!onboardingCompleted) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], 
};