// convex/workspaces.ts
import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireSignedIn } from "./guards";

export const createWorkspace = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const user = await requireSignedIn(ctx);

    const workspaceId = await ctx.db.insert("workspaces", {
      name,
      ownerId: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("workspaceMembers", {
      workspaceId,
      userId: user._id,
      role: "owner",
      joinedAt: Date.now(),
    });

    return workspaceId;
  },
});

export const updateWorkspace = mutation({
  args: { workspaceId: v.id("workspaces"), name: v.string() },
  handler: async (ctx, { workspaceId, name }) => {
    const user = await requireSignedIn(ctx);
    const ws = await ctx.db.get(workspaceId);
    if (!ws) throw new ConvexError("Workspace not found");
    if (ws.ownerId !== user._id) throw new ConvexError("Not authorized");

    await ctx.db.patch(workspaceId, { name, updatedAt: Date.now() });
    return workspaceId;
  },
});

export const deleteWorkspace = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const user = await requireSignedIn(ctx);
    const ws = await ctx.db.get(workspaceId);
    if (!ws) throw new ConvexError("Workspace not found");
    if (ws.ownerId !== user._id) throw new ConvexError("Not authorized");

    const diagrams = await ctx.db
      .query("diagrams")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();
    await Promise.all(diagrams.map((d) => ctx.db.delete(d._id)));

    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();
    await Promise.all(members.map((m) => ctx.db.delete(m._id)));

    await ctx.db.delete(workspaceId);
  },
});
