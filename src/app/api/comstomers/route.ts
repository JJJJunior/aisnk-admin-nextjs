import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    // console.log(userId)
    if (!userId) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    let user = await prisma.userInStore.findUnique({
      where: { clerkId: userId },
    });

    //When the user signs in for the first time,we will create a new user for them
    if (!user) {
      user = await prisma.userInStore.create({
        data: {
          clerkId: userId,
        },
      });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
