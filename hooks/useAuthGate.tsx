"use client";
import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function useAuthGate() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("Sign in to save your work.");

  const run = async <T,>(fn: () => Promise<T>) => {
    try {
      return await fn();
    } catch (e: any) {
      if (
        e?.data?.code === "ERR_AUTH_REQUIRED" ||
        e?.code === "ERR_AUTH_REQUIRED"
      ) {
        setMessage(e.message ?? "Sign in to continue.");
        setOpen(true);
        return;
      }
      throw e;
    }
  };

  const AuthDialog = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>
        <SignInButton mode="modal">
          <button className="w-full rounded-2xl px-4 py-2 shadow">
            Sign in
          </button>
        </SignInButton>
      </DialogContent>
    </Dialog>
  );

  return { run, AuthDialog };
}
