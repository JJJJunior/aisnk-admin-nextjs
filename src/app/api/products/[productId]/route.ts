import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma";

export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    //查出产品以及关联关系
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        collections: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // 清空全部的关联关系
    if (product.collections.length > 0) {
      await prisma.productsOnCollections.deleteMany({
        where: {
          productId: product.id,
        },
      });
    }

    await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return new NextResponse("Collection is deleted!", { status: 200 });
  } catch (err) {
    console.log("[product_Id_DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        collections: true,
      },
    });
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }
    return NextResponse.json(product, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 404 });
    }

    const { productId } = params;

    const { title, description, images, category, collections, stock, tags, status, sizes, colors, price, expense } =
      await req.json();

    if (!title || !description || !images || !category || !price) {
      return new NextResponse("Not enough data to create a product!", { status: 400 });
    }

    // 查找现有产品,主要作用是查出产品目前关联的栏目数据
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { collections: true },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // 清空全部的关联关系
    if (product.collections.length > 0) {
      await prisma.productsOnCollections.deleteMany({
        where: {
          productId: product.id,
        },
      });
    }
    //更新数据，创建关联关系
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
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
        tags,
        status,
        stock,
        sizes,
        colors,
        price,
        expense,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
