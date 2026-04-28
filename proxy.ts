import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const LOGIN_PATH = "/admin-login";

function safeSessionEq(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== LOGIN_PATH;
  const isLoginPage = pathname === LOGIN_PATH;

  const session = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const isAuthenticated =
    !!session && !!secret && safeSessionEq(session, secret);

  // Protect all /admin/* routes
  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in — skip login page
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
