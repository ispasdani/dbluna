import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWorkspaceMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    // Get user details for each member
    const membersWithUserData = await Promise.all(
      members.map(async (member) => {
        const user = await ctx.db.get(member.userId);
        return {
          ...member,
          user,
        };
      })
    );

    return membersWithUserData;
  },
});

export const addWorkspaceMember = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer")
    ),
  },
  handler: async (ctx, args) => {
    // Check if member already exists
    const existing = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace_and_user", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", args.userId)
      )
      .unique();

    if (existing) {
      throw new ConvexError("User is already a member of this workspace");
    }

    const memberId = await ctx.db.insert("workspaceMembers", {
      workspaceId: args.workspaceId,
      userId: args.userId,
      role: args.role,
      joinedAt: Date.now(),
    });

    return memberId;
  },
});

export const updateMemberRole = mutation({
  args: {
    memberId: v.id("workspaceMembers"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer")
    ),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.memberId);

    if (!member) {
      throw new ConvexError("Member not found");
    }

    await ctx.db.patch(args.memberId, {
      role: args.role,
    });

    return args.memberId;
  },
});

export const removeMember = mutation({
  args: { memberId: v.id("workspaceMembers") },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.memberId);

    if (!member) {
      throw new ConvexError("Member not found");
    }

    await ctx.db.delete(args.memberId);
  },
});

export const getMemberRole = query({
  args: {
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace_and_user", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", args.userId)
      )
      .unique();

    return member?.role || null;
  },
});
