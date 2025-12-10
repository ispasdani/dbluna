"use client";

import { useUser } from "@clerk/nextjs";

export type UserTier = "guest" | "free" | "pro";

export const useUserTier = (): { tier: UserTier; isLoaded: boolean } => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    // still loading, treat as guest but expose isLoaded
    return { tier: "guest", isLoaded: false };
  }

  if (!isSignedIn || !user) {
    return { tier: "guest", isLoaded: true };
  }

  // you can mirror Convex subscriptionStatus into Clerk publicMetadata.plan
  const plan = (user.publicMetadata?.plan as string) || "free";

  if (plan === "pro") {
    return { tier: "pro", isLoaded: true };
  }

  return { tier: "free", isLoaded: true };
};
