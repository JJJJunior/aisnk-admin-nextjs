import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });
    const relatedProducts = await prisma.product.findMany({
      where: {
        OR: [
          {
            category: product?.category,
          },
        ],
      },
    });
    if (!relatedProducts) {
      return new NextResponse("No related products found", { status: 404 }); // ���有找到相关的category下的产品
    }
    // 推荐相关的category下的产品
    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (err) {
    console.error("[related_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
