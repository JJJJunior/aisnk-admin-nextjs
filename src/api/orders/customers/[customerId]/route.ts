import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: params.customerId,
      },
      include: {
        orders: {
          select: {
            id: true,
            products: {
              include: {
                product: true,
              },
            },
            shippingAddress: true,
            shippingRate: true,
            totalAmount: true,
            createdAt: true,
          },
        },
      },
    });
    return NextResponse.json(customer?.orders, { status: 200 });
  } catch (err) {
    console.log("[customerId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
