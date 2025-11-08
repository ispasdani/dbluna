import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

type DiagramUpdates = Partial<
  Pick<
    Doc<"diagrams">,
    "name" | "tables" | "relationships" | "areas" | "notes" | "camera"
  >
> & {
  updatedAt: number;
};

export const getDiagramsByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const diagrams = await ctx.db
      .query("diagrams")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .order("desc")
      .collect();

    return diagrams;
  },
});

export const getDiagramById = query({
  args: { diagramId: v.id("diagrams") },
  handler: async (ctx, args) => {
    const diagram = await ctx.db.get(args.diagramId);

    if (!diagram) {
      throw new ConvexError("Diagram not found");
    }

    return diagram;
  },
});

export const createDiagram = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
    createdBy: v.id("users"),
    tables: v.optional(v.any()),
    relationships: v.optional(v.any()),
    areas: v.optional(v.any()),
    notes: v.optional(v.any()),
    camera: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const diagramId = await ctx.db.insert("diagrams", {
      workspaceId: args.workspaceId,
      name: args.name,
      createdBy: args.createdBy,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tables: args.tables || [],
      relationships: args.relationships || [],
      areas: args.areas || [],
      notes: args.notes || [],
      camera: args.camera || { x: 0, y: 0, zoom: 1 },
    });

    return diagramId;
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
    const diagram = await ctx.db.get(args.diagramId);

    if (!diagram) {
      throw new ConvexError("Diagram not found");
    }

    const updates: DiagramUpdates = {
      updatedAt: Date.now(),
    };

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
  handler: async (ctx, args) => {
    const diagram = await ctx.db.get(args.diagramId);

    if (!diagram) {
      throw new ConvexError("Diagram not found");
    }

    await ctx.db.delete(args.diagramId);
  },
});

export const duplicateDiagram = mutation({
  args: {
    diagramId: v.id("diagrams"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const original = await ctx.db.get(args.diagramId);

    if (!original) {
      throw new ConvexError("Diagram not found");
    }

    const newDiagramId = await ctx.db.insert("diagrams", {
      workspaceId: original.workspaceId,
      name: `${original.name} (Copy)`,
      createdBy: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tables: original.tables,
      relationships: original.relationships,
      areas: original.areas,
      notes: original.notes,
      camera: original.camera,
    });

    return newDiagramId;
  },
});
