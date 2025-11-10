"use client";

import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
  useAuth,
} from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!convexUrl) console.warn("NEXT_PUBLIC_CONVEX_URL is not set");
if (!clerkPk) console.warn("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set");

const convex = new ConvexReactClient(convexUrl ?? "");

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={clerkPk}
      // Optional, helpful with App Router:
      // afterSignInUrl="/"
      // afterSignUpUrl="/"
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/logo.svg",
        },
        variables: {
          colorBackground: "#15171c",
          colorPrimary: "",
          colorText: "white",
          colorInputBackground: "#1b1f29",
          colorInputText: "white",
        },
      }}
    >
      <ClerkLoading>{/* optional: skeleton */}</ClerkLoading>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
