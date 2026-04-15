import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";

const AUTH_ROUTES = new Set(["/login", "/register"]);

const USER_PROTECTED_PREFIXES = [
  "/feed",
  "/calendar",
  "/cot",
  "/news",
  "/speeches",
  "/gri",
  "/correlation",
  "/saved",
  "/profile",
  "/pricing",
  "/upgrade",
];

const ADMIN_PROTECTED_PREFIX = "/admin";
const WEBHOOK_PUBLIC_PREFIX = "/api/webhooks/";

const isPathMatch = (pathname: string, prefix: string): boolean =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

const isPublicRoute = (pathname: string): boolean => {
  if (pathname === "/" || pathname.startsWith("/insights")) {
    return true;
  }

  if (AUTH_ROUTES.has(pathname)) {
    return true;
  }

  if (pathname.startsWith(WEBHOOK_PUBLIC_PREFIX)) {
    return true;
  }

  return false;
};

const isProtectedRoute = (pathname: string): boolean => {
  if (isPathMatch(pathname, ADMIN_PROTECTED_PREFIX)) {
    return true;
  }

  return USER_PROTECTED_PREFIXES.some((prefix) => isPathMatch(pathname, prefix));
};

export default auth((request: NextRequest) => {
  const { nextUrl, auth: session } = request;
  const { pathname } = nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", nextUrl.origin);
  loginUrl.searchParams.set("callbackUrl", pathname);

  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
