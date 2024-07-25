import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.userInStore.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { productId } = await req.json();
    const isLiked = user.wishlist ? user.wishlist.split(",").includes(productId) : false;

    if (isLiked) {
      await prisma.userInStore.update({
        where: {
          clerkId: userId,
        },
        data: {
          wishlist: user.wishlist
            ?.split(",")
            .filter((id: string) => id !== productId)
            .join(","),
        },
      });
    } else {
      await prisma.userInStore.update({
        where: {
          clerkId: userId,
        },
        data: {
          wishlist: user.wishlist ? [...user.wishlist?.split(","), productId].join(",") : productId,
        },
      });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("[wishlist_POST]", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
