import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWorkspacesByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get workspaces owned by user
    const ownedWorkspaces = await ctx.db
      .query("workspaces")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.userId))
      .collect();

    // Get workspaces where user is a member
    const memberships = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const sharedWorkspaces = await Promise.all(
      memberships.map(async (membership) => {
        const workspace = await ctx.db.get(membership.workspaceId);
        return workspace ? { ...workspace, role: membership.role } : null;
      })
    );

    return {
      owned: ownedWorkspaces,
      shared: sharedWorkspaces.filter(Boolean),
    };
  },
});

export const getWorkspaceById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);

    if (!workspace) {
      throw new ConvexError("Workspace not found");
    }

    return workspace;
  },
});

export const createWorkspace = mutation({
  args: {
    name: v.string(),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      ownerId: args.ownerId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add owner as a member with owner role
    await ctx.db.insert("workspaceMembers", {
      workspaceId,
      userId: args.ownerId,
      role: "owner",
      joinedAt: Date.now(),
    });

    return workspaceId;
  },
});

export const updateWorkspace = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);

    if (!workspace) {
      throw new ConvexError("Workspace not found");
    }

    await ctx.db.patch(args.workspaceId, {
      name: args.name,
      updatedAt: Date.now(),
    });

    return args.workspaceId;
  },
});

export const deleteWorkspace = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);

    if (!workspace) {
      throw new ConvexError("Workspace not found");
    }

    // Delete all diagrams in workspace
    const diagrams = await ctx.db
      .query("diagrams")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    await Promise.all(diagrams.map((d) => ctx.db.delete(d._id)));

    // Delete all workspace members
    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    await Promise.all(members.map((m) => ctx.db.delete(m._id)));

    // Delete workspace
    await ctx.db.delete(args.workspaceId);
  },
});
