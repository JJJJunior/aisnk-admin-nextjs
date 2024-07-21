import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      status,
      sizes,
      colors,
      price,
      expense
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product!", {status: 400});
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        media,
        category,
        collections: {
          create: collections.map((collectionId: string) => ({
            collection: {
              connect: {
                id: collectionId,
              },
            },
          })),
        },
        tags,
        status,
        sizes,
        colors,
        price,
        expense,
      },
    });
    return NextResponse.json(newProduct, {status: 200});
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", {status: 500});
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collections: {
          include: {
            collection: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    console.log(products)
    return NextResponse.json(products, {status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", {status: 500});
  }
};
