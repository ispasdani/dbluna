// convex/diagrams.ts
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requirePro, requireSignedIn, requireWorkspaceRole } from "./guards";
import { Doc } from "./_generated/dataModel";

type DiagramUpdates = Partial<
  Pick<
    Doc<"diagrams">,
    "name" | "tables" | "relationships" | "areas" | "notes" | "camera"
  >
> & { updatedAt: number };

export const createDiagram = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
    tables: v.optional(v.any()),
    relationships: v.optional(v.any()),
    areas: v.optional(v.any()),
    notes: v.optional(v.any()),
    camera: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { user } = await requireWorkspaceRole(ctx, args.workspaceId, [
      "owner",
      "admin",
      "editor",
    ]);

    requirePro(user); // or implement a small free quota instead

    const ws = await ctx.db.get(args.workspaceId);
    if (!ws) throw new ConvexError("Workspace not found");

    return await ctx.db.insert("diagrams", {
      workspaceId: args.workspaceId,
      name: args.name,
      createdBy: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tables: args.tables ?? [],
      relationships: args.relationships ?? [],
      areas: args.areas ?? [],
      notes: args.notes ?? [],
      camera: args.camera ?? { x: 0, y: 0, zoom: 1 },
    });
  },
});

export const updateDiagram = mutation({
  args: {
    diagramId: v.id("diagrams"),
    name: v.optional(v.string()),
    tables: v.optional(v.any()),
    relationships: v.optional(v.any()),
    areas: v.optional(v.any()),
    notes: v.optional(v.any()),
    camera: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const d = await ctx.db.get(args.diagramId);
    if (!d) throw new ConvexError("Diagram not found");

    const { user } = await requireWorkspaceRole(ctx, d.workspaceId, [
      "owner",
      "admin",
      "editor",
    ]);

    requirePro(user);

    const updates: DiagramUpdates = { updatedAt: Date.now() };

    if (args.name !== undefined) updates.name = args.name;
    if (args.tables !== undefined) updates.tables = args.tables;
    if (args.relationships !== undefined)
      updates.relationships = args.relationships;
    if (args.areas !== undefined) updates.areas = args.areas;
    if (args.notes !== undefined) updates.notes = args.notes;
    if (args.camera !== undefined) updates.camera = args.camera;

    await ctx.db.patch(args.diagramId, updates);
    return args.diagramId;
  },
});

export const deleteDiagram = mutation({
  args: { diagramId: v.id("diagrams") },
  handler: async (ctx, { diagramId }) => {
    const d = await ctx.db.get(diagramId);
    if (!d) throw new ConvexError("Diagram not found");

    const { user } = await requireWorkspaceRole(ctx, d.workspaceId, [
      "owner",
      "admin",
    ]);

    // If you want deletion Pro-only:
    requirePro(user);

    await ctx.db.delete(diagramId);
  },
});

export const duplicateDiagram = mutation({
  args: { diagramId: v.id("diagrams") },
  handler: async (ctx, { diagramId }) => {
    const original = await ctx.db.get(diagramId);
    if (!original) throw new ConvexError("Diagram not found");

    const { user } = await requireWorkspaceRole(ctx, original.workspaceId, [
      "owner",
      "admin",
      "editor",
      "viewer",
    ]);

    // Duplicating is still "saving", so gate it:
    requirePro(user);

    return await ctx.db.insert("diagrams", {
      workspaceId: original.workspaceId,
      name: `${original.name} (Copy)`,
      createdBy: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tables: original.tables,
      relationships: original.relationships,
      areas: original.areas,
      notes: original.notes,
      camera: original.camera,
    });
  },
});
