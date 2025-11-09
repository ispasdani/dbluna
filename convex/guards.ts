import type { MutationCtx, QueryCtx } from "./_generated/server";

export class AuthRequired extends Error {
  code = "ERR_AUTH_REQUIRED";
  constructor(message = "Sign in to save your work.") {
    super(message);
  }
}

export async function getCurrentUserDoc(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();
  return user ?? null;
}

export async function requireSignedIn(ctx: MutationCtx | QueryCtx) {
  const user = await getCurrentUserDoc(ctx);
  if (!user) throw new AuthRequired();
  return user;
}
