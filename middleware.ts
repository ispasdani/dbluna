import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  clerkMiddleware,
  createRouteMatcher,
  type ClerkMiddlewareAuth,
} from "@clerk/nextjs/server";

// Public routes that don't require sign-in
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/w/(.*)", // your public workspace route
  "/clerk(.*)", // Convex webhook endpoint
  "/api/(.*)", // keep public unless otherwise needed
  "/userDocs(.*)",
  "/blog(.*)",
]);

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    // Create a response we can modify
    const res = NextResponse.next();

    // 1) Assign visitorId cookie (analytics-only)
    if (!req.cookies.get("visitorId")) {
      res.cookies.set({
        name: "visitorId",
        value: crypto.randomUUID(), // global Edge runtime API
        httpOnly: true,
        sameSite: "lax", // must be lowercase
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year (in seconds)
      });
    }

    // 2) Require sign-in for protected routes
    if (!isPublicRoute(req)) {
      await auth.protect(); // redirects to Clerk sign-in if needed
    }

    return res; // Return our modified response
  }
);

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals & static assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
