// convex/guards.ts
import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

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

export function isPro(user: Doc<"users">): boolean {
  // Adjust this to match your billing logic.
  // For example, also check user.planId against a known PRO plan.
  return user.subscriptionStatus === "active";
}

// Optional if you want a shortcut that throws:
export function requirePro(user: Doc<"users">) {
  if (!isPro(user)) {
    throw new ConvexError("Upgrade to Pro to save diagrams.");
  }
}

type WorkspaceRole = "owner" | "admin" | "editor" | "viewer";

export async function requireWorkspaceRole(
  ctx: MutationCtx | QueryCtx,
  workspaceId: Id<"workspaces">,
  allowedRoles: WorkspaceRole[]
) {
  const user = await requireSignedIn(ctx);

  const membership = await ctx.db
    .query("workspaceMembers")
    .withIndex("by_workspace_and_user", (q) =>
      q.eq("workspaceId", workspaceId).eq("userId", user._id)
    )
    .unique();

  if (!membership || !allowedRoles.includes(membership.role)) {
    throw new ConvexError("You don't have access to this workspace.");
  }

  return { user, membership };
}
