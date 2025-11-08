import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

// Helpers
const now = () => Date.now();
const cleanPatch = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }
    return user;
  },
});

/**
 * Create a user that matches the schema:
 * - required: clerkId, email, firstName, createdAt
 * - optional: imageUrl, lastName, credits, subscription fields, planId
 */
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    credits: v.optional(v.number()),
    // Subscription fields (all optional)
    subscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    currentPeriodStart: v.optional(v.string()), // ISO
    currentPeriodEnd: v.optional(v.string()), // ISO
    cancelAtPeriodEnd: v.optional(v.boolean()),
    planId: v.optional(v.id("plans")),
  },
  handler: async (ctx, args) => {
    // Prevent duplicates by clerkId
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
    if (existing) {
      throw new ConvexError("User with this clerkId already exists");
    }

    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      imageUrl: args.imageUrl,
      credits: args.credits,
      createdAt: now(),
      // updatedAt is optional; omit on create
      // Subscription fields
      subscriptionId: args.subscriptionId,
      subscriptionStatus: args.subscriptionStatus,
      currentPeriodStart: args.currentPeriodStart,
      currentPeriodEnd: args.currentPeriodEnd,
      cancelAtPeriodEnd: args.cancelAtPeriodEnd,
      planId: args.planId,
    });
  },
});

/**
 * Update a user by clerkId. Only provided fields are patched.
 * Automatically sets updatedAt.
 */
export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    credits: v.optional(v.number()),
    // Subscription fields (all optional)
    subscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    currentPeriodStart: v.optional(v.string()), // ISO
    currentPeriodEnd: v.optional(v.string()), // ISO
    cancelAtPeriodEnd: v.optional(v.boolean()),
    planId: v.optional(v.id("plans")),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const patch = cleanPatch({
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      imageUrl: args.imageUrl,
      credits: args.credits,
      subscriptionId: args.subscriptionId,
      subscriptionStatus: args.subscriptionStatus,
      currentPeriodStart: args.currentPeriodStart,
      currentPeriodEnd: args.currentPeriodEnd,
      cancelAtPeriodEnd: args.cancelAtPeriodEnd,
      planId: args.planId,
      updatedAt: now(),
    });

    if (Object.keys(patch).length === 1 && "updatedAt" in patch) {
      // Nothing meaningful to update
      return;
    }

    await ctx.db.patch(user._id, patch);
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});
