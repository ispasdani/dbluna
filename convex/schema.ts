import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.optional(v.string()),
    clerkId: v.string(),
    firstName: v.string(),
    lastName: v.optional(v.string()),
    credits: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),

    // Subscription fields
    subscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    currentPeriodStart: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.string()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    planId: v.optional(v.id("plans")),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // 🔹 Diagrams
  diagrams: defineTable({
    ownerId: v.id("users"), // creator / ultimate owner
    name: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),

    // Optional public / short id for URLs, if you want
    publicId: v.optional(v.string()),

    tables: v.array(v.any()),
    relationships: v.array(v.any()),
    areas: v.array(v.any()),
    notes: v.array(v.any()),
    camera: v.object({
      x: v.number(),
      y: v.number(),
      zoom: v.number(),
    }),

    isDeleted: v.optional(v.boolean()),
  })
    .index("by_owner", ["ownerId"])
    .index("by_publicId", ["publicId"]),

  // 🔹 Per-user roles on each diagram
  diagramMembers: defineTable({
    diagramId: v.id("diagrams"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer")
    ),
    invitedAt: v.number(),
    acceptedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_diagram", ["diagramId"])
    .index("by_user", ["userId"])
    .index("by_diagram_and_user", ["diagramId", "userId"]),

  userPreferences: defineTable({
    userId: v.id("users"),
    theme: v.optional(v.string()),
    defaultView: v.optional(v.string()),
    snapToGrid: v.optional(v.boolean()),
    showGrid: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),

  plans: defineTable({
    name: v.string(), // 'FREE' | 'PRO'
    features: v.optional(v.any()),
    createdAt: v.number(),
  }),

  visitors: defineTable({
    visitorId: v.string(),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
    lastSeenAt: v.number(),
  }).index("by_visitorId", ["visitorId"]),

  analyticsEvents: defineTable({
    visitorId: v.string(),
    userId: v.optional(v.id("users")),
    type: v.string(),
    diagramId: v.optional(v.id("diagrams")), // no workspaceId now
    path: v.optional(v.string()),
    meta: v.optional(v.any()),
    ts: v.number(),
  }).index("by_visitorId", ["visitorId"]),
});
