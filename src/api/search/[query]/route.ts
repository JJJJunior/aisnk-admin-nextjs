import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma";

export const GET = async (req: NextRequest, { params }: { params: { query: string } }) => {
  try {
    const searchedProducts = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: params.query,
            },
          },
          {
            category: {
              contains: params.query,
            },
          },
          {
            tags: params.query,
          },
        ],
      },
    });

    return NextResponse.json(searchedProducts, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error!", { status: 500 });
  }
};
