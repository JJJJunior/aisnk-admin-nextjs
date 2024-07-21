import {NextResponse, NextRequest} from "next/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest, {params}: { params: { orderId: string } }) => {
  try {
    const orderDetail = await prisma.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        products: true,
        shippingAddress: true,
        customer: true
      }
    })

    return NextResponse.json(orderDetail, {status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", {status: 500});
  }
}