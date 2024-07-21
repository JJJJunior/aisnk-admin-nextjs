import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const orders = await prisma.order.findMany(
      {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          customer: true,
          shippingAddress: true,
          products: {
            include: {
              product: true,
            },
          },
        },
      } || []
    );
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
