import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/index";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    const { title, description, image } = await req.json();

    const existingCollection = await prisma.collection.findFirst({
      where: {
        title: title,
      },
    });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required!", { status: 400 });
    }

    const newCollection = await prisma.collection.create({
      data: {
        title,
        description,
        image,
      },
    });
    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
      },
    });
    // console.log(collections);
    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
