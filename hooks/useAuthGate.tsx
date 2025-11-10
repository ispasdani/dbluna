"use client";

import { toast } from "sonner";
import { SignInButton } from "@clerk/nextjs";

export function useAuthGate() {
  const run = async <T,>(fn: () => Promise<T>) => {
    try {
      return await fn();
    } catch (e: unknown) {
      const error = e as Error;
      if (error.cause) {
        toast.custom(() => (
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-white">
              {error.message ?? "Sign in to save your work."}
            </span>
            <SignInButton mode="modal">
              <button className="rounded-md bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20">
                Sign in
              </button>
            </SignInButton>
          </div>
        ));
        return;
      }
      throw e;
    }
  };

  return { run };
}
