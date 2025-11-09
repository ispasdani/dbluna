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

    // Subscription fields (for future use)
    subscriptionId: v.optional(v.string()), // Stripe subscription ID
    subscriptionStatus: v.optional(v.string()), // active, canceled, past_due, etc.
    currentPeriodStart: v.optional(v.string()), // ISO date string
    currentPeriodEnd: v.optional(v.string()), // ISO date string
    cancelAtPeriodEnd: v.optional(v.boolean()), // true if user canceled but subscription is still active
    planId: v.optional(v.id("plans")), // reference to current subscription plan
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  workspaces: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerId"]),

  workspaceMembers: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer")
    ),
    joinedAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_workspace_and_user", ["workspaceId", "userId"]),

  diagrams: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
    // Store the actual diagram data
    tables: v.array(v.any()),
    relationships: v.array(v.any()),
    areas: v.array(v.any()),
    notes: v.array(v.any()),
    camera: v.object({
      x: v.number(),
      y: v.number(),
      zoom: v.number(),
    }),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_creator", ["createdBy"]),

  userPreferences: defineTable({
    userId: v.id("users"),
    theme: v.optional(v.string()),
    defaultView: v.optional(v.string()),
    snapToGrid: v.optional(v.boolean()),
    showGrid: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),

  plans: defineTable({
    name: v.string(), // 'FREE' | 'PRO'
    features: v.optional(v.any()), // optional structured feature set
    createdAt: v.number(),
  }),
});
