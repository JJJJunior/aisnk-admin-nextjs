import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });
  // console.log(user);
  if (user?.role === "admin") {
    return new NextResponse("有权限", { status: 200 });
  }
  return new NextResponse("无权限", { status: 403 });
};
