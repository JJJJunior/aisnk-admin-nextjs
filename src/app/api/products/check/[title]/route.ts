import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { title: string } }) => {
  const title = params.title;
  if (typeof title === "string") {
    try {
      const product = await prisma.product.findFirst({
        where: {
          title,
        },
      });
      return NextResponse.json(product, { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Invalid title", { status: 400 });
  }
};
