# Backend Security & Authorization

## Authentication

- All Convex mutations/queries that touch user data call `requireSignedIn`.
- `requireSignedIn` binds the request to a Clerk user and a `users` row.

## Workspace Authorization

- Workspace-owned resources (e.g. diagrams) are protected by `requireWorkspaceRole`.
- `requireWorkspaceRole(ctx, workspaceId, allowedRoles)`:
  - Ensures the caller is in `workspaceMembers`.
  - Ensures their role is in `["owner", "admin", "editor", "viewer"]`.

## Billing / Plans

- Pro access is determined by `isPro(user)` based on `subscriptionStatus`/`planId`.
- Pro-only operations (saving/duplicating diagrams, etc.) call `requirePro(user)`.

## Free Playground

- Free users can edit diagrams client-side only.
- Saving requires calling Convex mutations, which enforce `requirePro`.

Gotcha, let’s zoom out and design this in terms of “how do I not get owned?” given your current stack (Clerk + Convex + workspaces/diagrams).

I’ll keep this in “concepts first, code later” mode like you asked.

1. What you actually need to protect against

With your setup, the realistic threats are:

Free users bypassing your paywall

E.g. somebody opens devtools and calls convex.mutation("diagrams:createDiagram", {...}) even though the UI says “upgrade to save”.

Users accessing or modifying other people’s stuff

Guessing / leaking IDs and then calling updateDiagram, deleteDiagram, duplicateDiagram on them.

Weird/invalid data being written

Malicious client sends nonsense tables or camera data, trying to break things.

The core idea: the Convex backend must be the bouncer. Anything that can be done in the UI must also be allowed at the mutation level, and anything disallowed must be blocked there, not just in React.

2. The core principles for your setup
   Principle A: Trust Convex, not the client

Right now you already have:

export async function requireSignedIn(ctx: MutationCtx | QueryCtx) {
const user = await getCurrentUserDoc(ctx);
if (!user) throw new AuthRequired();
return user;
}

This is good: it guarantees “this is a real signed-in user that exists in my users table”.

But this is only authentication.

You still need authorization & plan checks inside each mutation that changes important data (workspaces, members, diagrams).

Principle B: Enforce plan/limits in Convex, not in the UI

All paywall logic should be “if you call this mutation and you’re not Pro (or over your free quota) → Convex throws”.

Examples:

createDiagram:

For Pro: allowed.

For Free: maybe disallowed, or allowed only up to N diagrams.

updateDiagram:

Maybe Free can’t call it at all (full playground lives in the browser).

Or they can only update diagrams they created and under some size/complexity limit.

If all of those checks are only on the client, people can bypass them by calling the API directly. If they’re in Convex, they cannot bypass without also compromising your backend (which is a different level of threat).

Principle C: Enforce workspace + diagram ownership

Every mutation that touches a resource should:

Figure out which workspace this resource belongs to.

Check that the current user is a member of that workspace with an allowed role.

Optionally: check they are the createdBy for extra safety.

Right now updateDiagram / deleteDiagram only do:

const d = await ctx.db.get(args.diagramId);
if (!d) throw new ConvexError("Diagram not found");

They don't check if the caller:

is in workspaceMembers, or

is the owner / editor, or

is createdBy.

This means: any logged-in user who knows a diagram ID can edit/delete it. That’s the biggest security issue you have right now.

So the “best way to protect yourself” includes:

A central helper like requireWorkspaceRole(ctx, workspaceId, ["owner","admin","editor"]).

Calling that helper in every mutation that writes to workspaces, workspaceMembers, and diagrams.

Principle D: Make the free playground truly “non-saving”

You said:

For the free user I want a free and super simple version of the workspace where they can create diagrams etc. not be able to save…

The safest model here (and nicest to reason about):

For free users:

Never call createDiagram / updateDiagram at all.

Keep everything in localStorage or just in memory.

When they hit “Save” → you:

Check “are you Pro?” (client side)

If not → show upgrade modal, don’t call Convex.

For Pro users:

Use the Convex mutations as you already do (with the extra checks added).

Why this is good:

There is literally no server-side behavior a free user is entitled to.

If they hack the client and call createDiagram manually, Convex will say “no, you’re not Pro” (because you add that check on the server).

Free sandbox is as “safe” as drawing on a canvas in the browser.

You can later soften this, e.g. free users can save 1 diagram, but the critical piece is:

Convex must always enforce the rules, even if the UI lies.

Principle E: Keep your Stripe/plan state the source of truth

Your users schema has:

subscriptionId, subscriptionStatus

currentPeriodStart, currentPeriodEnd

cancelAtPeriodEnd

planId → plans table

Best practice:

Use your Stripe → webhook → Convex pipeline to set those fields.

Don’t let the client mutate them directly.

Build a small helper like isPro(user) that encodes your logic:

e.g. user.subscriptionStatus === "active" and user.planId === PRO_PLAN_ID.

Then in each “Pro-only” mutation, call isPro(user) and throw if false.

3. Putting it together: the “best” protection strategy for your app

Given your current setup, here’s the layered defense I’d aim for:

1. Authentication: ✅ you already have this

Clerk + requireSignedIn(ctx) in Convex.

Next Middleware ensures unauthenticated users don’t even see protected pages.

2. Authorization per workspace/diagram: you need this

Add a helper that:

Looks up workspaceMembers for (workspaceId, user.\_id).

Ensures the user has a required role (owner/admin/editor/viewer depending on action).

Use it in:

createDiagram (on its workspace)

updateDiagram, deleteDiagram, duplicateDiagram (by resolving the diagram’s workspaceId first)

Any workspace-level edits (rename workspace, invite member, change role, etc.)

This protects you from cross-tenant data leaks or tampering.

3. Plan enforcement / free vs pro: also needed server-side

Add an isPro(user) helper based on the fields you already have.

In critical mutations:

createDiagram, updateDiagram, maybe duplicateDiagram:

If !isPro(user) → throw ConvexError("Upgrade to Pro to save diagrams").

Or, if you want limited free saves:

Count their diagrams and enforce a max.

This protects you from free users bypassing billing with custom API calls.

4. Free playground as “client-only”

For the UX you described (can “create” but not “save”):

Let the free experience live entirely in React state/localStorage.

Only hit Convex once someone is Pro.

Even if you later allow some server saves, having this mental model keeps things clean:
“Saving = Convex. Playground = client.”

5. Extra niceties (optional but good):

Add some basic shape validation / size checks for tables, relationships, areas, notes, camera so someone can’t upload gigabytes of junk.

Rate-limit expensive mutations on the Convex side if you ever see abuse.

If you want, next step I can:

Propose a requireWorkspaceRole helper, and

Show how to modify your createDiagram / updateDiagram to use both requireWorkspaceRole + isPro(user),

so you can literally paste it into your Convex project and be in a much safer place.

I’ll document the helpers and then the expected usage in your mutations.

requireSignedIn
/\*\*

- Ensures the current Convex request is associated with a signed-in Clerk user
- that has a corresponding row in the `users` table.
-
- Flow:
- 1. Reads the Clerk identity from `ctx.auth.getUserIdentity()`.
- 2. Looks up the matching user in the `users` table via the `by_clerk_id` index.
- 3. If no identity or no user row is found, throws `AuthRequired`.
- 4. Otherwise returns the `users` document.
-
- Usage:
- - Call at the start of any mutation/query that requires a logged in user.
- - Do NOT trust client-side "is logged in" flags; always use this.
    \*/
    export async function requireSignedIn(ctx: MutationCtx | QueryCtx): Promise<Doc<"users">> {
    ...
    }

isPro
/\*\*

- Returns true if the given user should be treated as having "Pro" access.
-
- This function encapsulates your billing logic. For now it checks the
- user's `subscriptionStatus` field, but it can be extended to use `planId`
- or the `plans` table.
-
- Important:
- - This check is executed on the server, so it cannot be bypassed by
- modifying client-side code.
- - All Pro-only Convex mutations should use this (directly or via `requirePro`).
    \*/
    export function isPro(user: Doc<"users">): boolean {
    ...
    }

requirePro
/\*\*

- Throws if the given user does not have Pro access.
-
- Intended usage:
- - At the start of any mutation that should be available to Pro users only
- (e.g. saving diagrams, duplicating diagrams, advanced workspace features).
-
- Example:
- export const createDiagram = mutation({
- ...,
- handler: async (ctx, args) => {
-      const { user } = await requireWorkspaceRole(ctx, args.workspaceId, ["owner", "admin", "editor"]);
-      requirePro(user); // Enforce billing
-      ...
- },
- });
-
- This ensures that even if a free user calls the Convex mutation directly
- (e.g. from the browser dev tools), the backend will still reject the call.
  \*/
  export function requirePro(user: Doc<"users">): void {
  ...
  }

requireWorkspaceRole
/\*\*

- Ensures the current user is a member of the given workspace with
- one of the allowed roles.
-
- This is the central authorization guard for all workspace- and
- diagram-related mutations/queries.
-
- Flow:
- 1. Uses `requireSignedIn` to get the current `users` document.
- 2. Looks up a `workspaceMembers` row using the `by_workspace_and_user`
-     index for (workspaceId, user._id).
- 3. If no membership is found, or the membership role is not in
-     `allowedRoles`, throws a `ConvexError`.
- 4. Otherwise returns `{ user, membership }`.
-
- Parameters:
- - ctx: Convex mutation or query context.
- - workspaceId: The workspace that protects the resource being accessed.
- - allowedRoles: Array of roles that are allowed to perform the operation.
- Examples:
-      ["owner", "admin"]                    // very privileged actions
-      ["owner", "admin", "editor"]          // typical write operations
-      ["owner", "admin", "editor", "viewer"]// read-only operations
-
- Usage pattern:
- - For any resource that belongs to a workspace (e.g. diagrams), resolve
- the workspaceId from the resource, then call `requireWorkspaceRole`.
-
- Example (updateDiagram):
-
- export const updateDiagram = mutation({
- args: { diagramId: v.id("diagrams"), ... },
- handler: async (ctx, args) => {
-      const d = await ctx.db.get(args.diagramId);
-      if (!d) throw new ConvexError("Diagram not found");
-
-      const { user } = await requireWorkspaceRole(ctx, d.workspaceId, [
-        "owner",
-        "admin",
-        "editor",
-      ]);
-
-      // Optionally enforce billing:
-      // requirePro(user);
-      // ...apply updates...
- },
- });
-
- Security guarantees:
- - Users can only read/write resources in workspaces where they have
- an explicit membership row.
- - Role-based checks are enforced server-side and cannot be bypassed
- from the client.
  \*/
  export async function requireWorkspaceRole(
  ctx: MutationCtx | QueryCtx,
  workspaceId: Id<"workspaces">,
  allowedRoles: Array<"owner" | "admin" | "editor" | "viewer">
  ): Promise<{ user: Doc<"users">; membership: Doc<"workspaceMembers"> }> {
  ...
  }

How to describe this in a short “security model” section

If you want a short text block (for SECURITY.md or comments at the top of diagrams.ts):

/\*\*

- Security model (workspaces & diagrams)
-
- - Authentication:
- All Convex mutations/queries that touch user data use `requireSignedIn`,
- which binds the request to a Clerk user and a row in the `users` table.
-
- - Authorization (workspace-level):
- Access to workspace-owned resources (e.g. diagrams) is enforced via
- `requireWorkspaceRole(ctx, workspaceId, allowedRoles)`. This guarantees:
-     - The caller is a member of the workspace (`workspaceMembers` row exists).
-     - Their role is one of the allowed roles for the operation.
-
- - Billing / plan enforcement:
- Pro-only functionality (saving/duplicating diagrams, etc.) is enforced
- server-side via `isPro(user)` / `requirePro(user)`. Client-side checks are
- only used for UX (showing upgrade prompts) and are not relied on for security.
-
- - Free playground:
- Free users can interact with diagrams client-side, but saving and other
- persistent operations must go through Convex mutations, which in turn call
- `requirePro`. This prevents free users from bypassing the paywall by
- calling the API directly.
  \*/

If you tell me which file you’re dropping these into (guards.ts, diagrams.ts, etc.), I can format the docs to fit exactly around the code you already have.
