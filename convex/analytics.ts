// convex/analytics.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const upsertVisitor = mutation({
  args: { visitorId: v.string(), userAgent: v.optional(v.string()) },
  handler: async (ctx, { visitorId, userAgent }) => {
    const existing = await ctx.db
      .query("visitors")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", visitorId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        lastSeenAt: Date.now(),
        userAgent: userAgent ?? existing.userAgent,
      });
      return existing._id;
    }

    return await ctx.db.insert("visitors", {
      visitorId,
      userAgent,
      createdAt: Date.now(),
      lastSeenAt: Date.now(),
    });
  },
});

export const logEvent = mutation({
  args: {
    visitorId: v.string(),
    type: v.string(),
    path: v.optional(v.string()),
    workspaceId: v.optional(v.id("workspaces")),
    diagramId: v.optional(v.id("diagrams")),
    meta: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    const userDoc = user
      ? await ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", user.subject))
          .unique()
      : null;

    await ctx.db.insert("analyticsEvents", {
      visitorId: args.visitorId,
      userId: userDoc?._id,
      type: args.type,
      path: args.path,
      workspaceId: args.workspaceId,
      diagramId: args.diagramId,
      meta: args.meta,
      ts: Date.now(),
    });
  },
});
