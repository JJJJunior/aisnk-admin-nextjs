import { headers } from "next/headers";
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

  // console.log(payload.type);

  if (payload.type === "user.created") {
    try {
      await prisma.user.create({
        data: {
          id: payload.data.id,
          email_address: {
            create: payload.data.email_addresses.map((item) => ({
              id: item.id,
              email_address: item.email_address,
              object: item.object,
            })),
          },
          first_name: payload.data.first_name,
          last_name: payload.data.last_name,
          last_sign_in_at: payload.data.last_sign_in_at,
          image_url: payload.data.image_url,
          object: payload.data.object,
          created_at: payload.data.created_at,
        },
      });
      return new Response("User created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (payload.type === "user.updated") {
    try {
      await prisma.user.update({
        where: {
          id: payload.data.id,
        },
        data: {
          email_address: {
            create: payload.data.email_addresses.map((item) => ({
              email_address: item.email_address,
              object: item.object,
            })),
          },
          first_name: payload.data.first_name,
          last_name: payload.data.last_name,
          last_sign_in_at: payload.data.last_sign_in_at,
          image_url: payload.data.image_url,
          object: payload.data.object,
          created_at: payload.data.created_at,
        },
      });
      return new Response("User updated successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (payload.type === "user.deleted") {
    try {
      await prisma.user.delete({
        where: {
          id: payload.data.id,
        },
      });
      return new Response("User deleted successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (payload.type === "session.created") {
    try {
      await prisma.session.create({
        data: {
          id: payload.data.id,
          client_id: payload.data.client_id,
          session_token: payload.data.session_token,
          created_at: payload.data.created_at,
          expires_at: payload.data.expires_at,
          last_active_at: payload.data.last_active_at,
          object: payload.data.object,
          status: payload.data.status,
          updated_at: payload.data.updated_at,
          user_id: payload.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  if (payload.type === "session.removed") {
    try {
      await prisma.session.update({
        where: {
          id: payload.data.id,
        },
        data: {
          client_id: payload.data.client_id,
          session_token: payload.data.session_token,
          created_at: payload.data.created_at,
          expires_at: payload.data.expires_at,
          last_active_at: payload.data.last_active_at,
          object: payload.data.object,
          status: payload.data.status,
          updated_at: payload.data.updated_at,
          user_id: payload.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }
  if (payload.type === "session.ended") {
    try {
      await prisma.session.update({
        where: {
          id: payload.data.id,
        },
        data: {
          client_id: payload.data.client_id,
          session_token: payload.data.session_token,
          created_at: payload.data.created_at,
          expires_at: payload.data.expires_at,
          last_active_at: payload.data.last_active_at,
          object: payload.data.object,
          status: payload.data.status,
          updated_at: payload.data.updated_at,
          user_id: payload.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }
  if (payload.type === "session.revoked") {
    try {
      await prisma.session.update({
        where: {
          id: payload.data.id,
        },
        data: {
          client_id: payload.data.client_id,
          session_token: payload.data.session_token,
          created_at: payload.data.created_at,
          expires_at: payload.data.expires_at,
          last_active_at: payload.data.last_active_at,
          object: payload.data.object,
          status: payload.data.status,
          updated_at: payload.data.updated_at,
          user_id: payload.data.user_id,
        },
      });
      return new Response("Session created successfully", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Internal error", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
