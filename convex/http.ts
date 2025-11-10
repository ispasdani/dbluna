import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  let event: WebhookEvent;
  try {
    event = await validateRequest(request);
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const data = event.data;
      const primaryEmailId = data.primary_email_address_id;
      const emailObj =
        data.email_addresses.find((e) => e.id === primaryEmailId) ??
        data.email_addresses[0];
      const email = emailObj?.email_address;
      const imageUrl = data.image_url ?? undefined;

      const firstName = (data.first_name ?? "").trim();
      const lastName = data.last_name?.trim() || undefined;

      if (!email) {
        return new Response("Missing email", { status: 422 });
      }

      if (event.type === "user.created") {
        await ctx.runMutation(internal.users.createUser, {
          clerkId: data.id,
          email,
          firstName: firstName || "User",
          lastName,
          imageUrl,
          credits: 0,
        });
      } else {
        await ctx.runMutation(internal.users.updateUser, {
          clerkId: data.id,
          email,
          firstName: firstName || undefined,
          lastName,
          imageUrl,
        });
      }
      break;
    }

    case "user.deleted": {
      const data = event.data;
      await ctx.runMutation(internal.users.deleteUser, { clerkId: data.id! });
      break;
    }

    default:
      break;
  }

  return new Response(null, { status: 200 });
});

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;

async function validateRequest(req: Request): Promise<WebhookEvent> {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }

  const payload = await req.text();
  const headers = req.headers;

  const svixId = headers.get("svix-id");
  const svixTimestamp = headers.get("svix-timestamp");
  const svixSignature = headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new Error("Missing Svix headers");
  }

  const wh = new Webhook(webhookSecret);
  const evt = wh.verify(payload, {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  }) as WebhookEvent;

  return evt;
}
