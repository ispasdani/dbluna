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

/**
 * Get the current user document or null if not signed in.
 */
export async function getCurrentUserDoc(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();

  return user ?? null;
}

/**
 * Require a signed-in user, otherwise throw.
 */
export async function requireSignedIn(ctx: MutationCtx | QueryCtx) {
  const user = await getCurrentUserDoc(ctx);
  if (!user) throw new AuthRequired();
  return user;
}

/**
 * Basic PRO check – tweak to match your billing logic.
 */
export function isPro(user: Doc<"users">): boolean {
  return user.subscriptionStatus === "active";
}

export function requirePro(user: Doc<"users">) {
  if (!isPro(user)) {
    throw new ConvexError("Upgrade to Pro to save diagrams.");
  }
}

/* ------------------------------------------------------------------ */
/*  Diagram-level authorization (roles per diagram)                    */
/* ------------------------------------------------------------------ */

export type DiagramRole = "owner" | "admin" | "editor" | "viewer";

/**
 * Require the current user to have one of the allowed roles on a diagram.
 *
 * - Checks membership in `diagramMembers`.
 * - Also treats `diagrams.ownerId` as an implicit "owner" role
 *   in case you haven't created a diagramMembers row for the owner yet.
 */
export async function requireDiagramRole(
  ctx: MutationCtx | QueryCtx,
  diagramId: Id<"diagrams">,
  allowedRoles: DiagramRole[]
) {
  const user = await requireSignedIn(ctx);

  const diagram = await ctx.db.get(diagramId);
  if (!diagram) {
    throw new ConvexError("Diagram not found.");
  }

  // Check explicit membership
  const membership = await ctx.db
    .query("diagramMembers")
    .withIndex("by_diagram_and_user", (q) =>
      q.eq("diagramId", diagramId).eq("userId", user._id)
    )
    .unique();

  let role: DiagramRole | null = null;

  if (membership) {
    role = membership.role;
  } else if (diagram.ownerId === user._id) {
    // Fallback: the owner always has "owner" role
    role = "owner";
  }

  if (!role || !allowedRoles.includes(role)) {
    throw new ConvexError("You don't have access to this diagram.");
  }

  return { user, diagram, role, membership };
}

/**
 * Convenience helpers
 */
export async function requireDiagramViewer(
  ctx: MutationCtx | QueryCtx,
  diagramId: Id<"diagrams">
) {
  return requireDiagramRole(ctx, diagramId, [
    "owner",
    "admin",
    "editor",
    "viewer",
  ]);
}

export async function requireDiagramEditor(
  ctx: MutationCtx | QueryCtx,
  diagramId: Id<"diagrams">
) {
  return requireDiagramRole(ctx, diagramId, ["owner", "admin", "editor"]);
}

export async function requireDiagramOwnerOrAdmin(
  ctx: MutationCtx | QueryCtx,
  diagramId: Id<"diagrams">
) {
  return requireDiagramRole(ctx, diagramId, ["owner", "admin"]);
}
