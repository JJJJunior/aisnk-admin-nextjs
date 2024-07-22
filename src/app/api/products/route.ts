import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../../prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { title, description, images, category, collections, stock, tags, status, sizes, colors, price, expense } =
      await req.json();

    if (!title || !description || !images || !category || !price) {
      return new NextResponse("Not enough data to create a product!", { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        images: images.length > 1 ? images.join(",") : images[0],
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
        tags: tags.length > 1 ? tags.join(",") : tags[0],
        status,
        stock,
        sizes: sizes.length > 1 ? sizes.join(",") : sizes[0],
        colors: colors.length > 1 ? colors.join(",") : colors[0],
        price,
        expense,
      },
    });
    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
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
    console.log(products);
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
