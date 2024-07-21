import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/prisma";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  // const { id } = evt.data;
  // const eventType = evt.type;
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  if (evt.type === "user.created") {
    try {
      await prisma.user.create({
        data: {
          id: evt.data.id,
          email_address: {
            create: evt.data.email_addresses.map((item) => ({
              id: item.id,
              email_address: item.email_address,
              object: item.object,
            })),
          },
          first_name: evt.data.first_name,
          last_name: evt.data.last_name,
          last_sign_in_at: evt.data.last_sign_in_at,
          image_url: evt.data.image_url,
          object: evt.data.object,
          created_at: evt.data.created_at,
        },
      });
      return new Response("User created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (evt.type === "user.updated") {
    try {
      await prisma.user.update({
        where: {
          id: evt.data.id,
        },
        data: {
          email_address: {
            create: evt.data.email_addresses.map((item) => ({
              email_address: item.email_address,
              object: item.object,
            })),
          },
          first_name: evt.data.first_name,
          last_name: evt.data.last_name,
          last_sign_in_at: evt.data.last_sign_in_at,
          image_url: evt.data.image_url,
          object: evt.data.object,
          created_at: evt.data.created_at,
        },
      });
      return new Response("User updated successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (evt.type === "user.deleted") {
    try {
      await prisma.user.delete({
        where: {
          id: evt.data.id,
        },
      });
      return new Response("User deleted successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (evt.type === "session.created") {
    try {
      await prisma.session.create({
        data: {
          id: evt.data.id,
          client_id: evt.data.client_id,
          session_token: evt.data.session_token,
          created_at: evt.data.created_at,
          expires_at: evt.data.expires_at,
          last_active_at: evt.data.last_active_at,
          object: evt.data.object,
          status: evt.data.status,
          updated_at: evt.data.updated_at,
          user_id: evt.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (evt.type === "session.removed") {
    try {
      await prisma.session.update({
        where: {
          id: evt.data.id,
        },
        data: {
          client_id: evt.data.client_id,
          session_token: evt.data.session_token,
          created_at: evt.data.created_at,
          expires_at: evt.data.expires_at,
          last_active_at: evt.data.last_active_at,
          object: evt.data.object,
          status: evt.data.status,
          updated_at: evt.data.updated_at,
          user_id: evt.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }
  if (evt.type === "session.ended") {
    try {
      await prisma.session.update({
        where: {
          id: evt.data.id,
        },
        data: {
          client_id: evt.data.client_id,
          session_token: evt.data.session_token,
          created_at: evt.data.created_at,
          expires_at: evt.data.expires_at,
          last_active_at: evt.data.last_active_at,
          object: evt.data.object,
          status: evt.data.status,
          updated_at: evt.data.updated_at,
          user_id: evt.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }
  if (evt.type === "session.revoked") {
    try {
      await prisma.session.update({
        where: {
          id: evt.data.id,
        },
        data: {
          client_id: evt.data.client_id,
          session_token: evt.data.session_token,
          created_at: evt.data.created_at,
          expires_at: evt.data.expires_at,
          last_active_at: evt.data.last_active_at,
          object: evt.data.object,
          status: evt.data.status,
          updated_at: evt.data.updated_at,
          user_id: evt.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }
}
