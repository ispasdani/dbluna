// convex/diagrams.ts
import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import {
  requirePro,
  requireSignedIn,
  requireDiagramEditor,
  requireDiagramOwnerOrAdmin,
  requireDiagramViewer,
} from "./guards";
import type { Doc, Id } from "./_generated/dataModel";

type DiagramUpdates = Partial<
  Pick<
    Doc<"diagrams">,
    "name" | "tables" | "relationships" | "areas" | "notes" | "camera"
  >
> & { updatedAt: number };

/**
 * Create a new diagram for the current user.
 * (Cloud save → gated behind Pro, free users stay in localStorage only.)
 */
export const createDiagram = mutation({
  args: {
    name: v.string(),
    tables: v.optional(v.any()),
    relationships: v.optional(v.any()),
    areas: v.optional(v.any()),
    notes: v.optional(v.any()),
    camera: v.optional(v.any()),
    // Optional: if you decide to route via a custom public id instead of Convex id:
    publicId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireSignedIn(ctx);

    // If you want cloud diagrams to be Pro-only:
    requirePro(user);

    const now = Date.now();

    const diagramId = await ctx.db.insert("diagrams", {
      ownerId: user._id,
      name: args.name,
      createdAt: now,
      updatedAt: now,
      publicId: args.publicId,
      tables: args.tables ?? [],
      relationships: args.relationships ?? [],
      areas: args.areas ?? [],
      notes: args.notes ?? [],
      camera: args.camera ?? { x: 0, y: 0, zoom: 1 },
      isDeleted: false,
    });

    // Ensure the owner also has an explicit membership row.
    await ctx.db.insert("diagramMembers", {
      diagramId,
      userId: user._id,
      role: "owner",
      invitedAt: now,
      acceptedAt: now,
      updatedAt: now,
    });

    return diagramId;
  },
});

/**
 * Update diagram contents (owner/admin/editor).
 */
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
    if (!d || d.isDeleted) throw new ConvexError("Diagram not found");

    const { user } = await requireDiagramEditor(ctx, args.diagramId);

    // Still treating “saving to cloud” as a Pro feature:
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

/**
 * Delete a diagram (owner/admin).
 * You can make this a soft delete if you prefer.
 */
export const deleteDiagram = mutation({
  args: { diagramId: v.id("diagrams") },
  handler: async (ctx, { diagramId }) => {
    const d = await ctx.db.get(diagramId);
    if (!d || d.isDeleted) throw new ConvexError("Diagram not found");

    const { user } = await requireDiagramOwnerOrAdmin(ctx, diagramId);

    // If you want deletion to also be Pro-only:
    requirePro(user);

    // Hard delete:
    await ctx.db.delete(diagramId);

    // Or soft delete:
    // await ctx.db.patch(diagramId, { isDeleted: true, updatedAt: Date.now() });
  },
});

/**
 * Duplicate a diagram (any member with at least viewer access).
 */
export const duplicateDiagram = mutation({
  args: { diagramId: v.id("diagrams") },
  handler: async (ctx, { diagramId }) => {
    const original = await ctx.db.get(diagramId);
    if (!original || original.isDeleted)
      throw new ConvexError("Diagram not found");

    const { user } = await requireDiagramViewer(ctx, diagramId);

    requirePro(user);

    const now = Date.now();

    const newDiagramId = await ctx.db.insert("diagrams", {
      ownerId: user._id, // the duplicator becomes the owner of the copy
      name: `${original.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
      publicId: undefined, // or generate a new one if you use public ids
      tables: original.tables,
      relationships: original.relationships,
      areas: original.areas,
      notes: original.notes,
      camera: original.camera,
      isDeleted: false,
    });

    await ctx.db.insert("diagramMembers", {
      diagramId: newDiagramId,
      userId: user._id,
      role: "owner",
      invitedAt: now,
      acceptedAt: now,
      updatedAt: now,
    });

    return newDiagramId;
  },
});
