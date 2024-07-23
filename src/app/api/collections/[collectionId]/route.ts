import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/prisma"

export const DELETE = async (req: NextRequest, {params}: { params: { collectionId: string } }) => {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", {status: 403});
    }

    if (params.collectionId === "") {
      return new NextResponse("No such collection id found", {status: 404});
    }

    //根据传递过来params删除栏目
    await prisma.collection.delete({
      where: {
        id: params.collectionId,
      },
    });

    return new NextResponse("Collection is deleted!", {status: 200});
  } catch (err) {
    console.log("[collection_Id_DELETE]", err);
    return new NextResponse("Internal Server Error", {status: 500});
  }
};

export const GET = async (req: NextRequest, {params}: { params: { collectionId: string } }) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id: params.collectionId,
      },
      include: {
        products: true,
      },
    });

    if (!collection) {
      return new NextResponse(JSON.stringify({message: "Collection not found"}), {status: 404});
    }
    return NextResponse.json(collection, {status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", {status: 500});
  }
};

export const POST = async (req: NextRequest, {params}: { params: { collectionId: string } }) => {
  try {
    const {userId} = auth();
    if (!userId) {
      return new NextResponse("Unauthorized!", {status: 404});
    }

    let collection = await prisma.collection.findUnique({
      where: {
        id: params.collectionId,
      },
    });

    if (!collection) {
      return new NextResponse("Collection not found", {status: 404});
    }

    const {title, description, images} = await req.json();

    if (!title || !description || !images) {
      return new NextResponse("Title and description images are required!", {status: 400});
    }

    console.log(images)

    collection = await prisma.collection.update({
      where: {
        id: params.collectionId,
      },
      data: {
        title,
        description,
        images: images?.length > 1 ? images.join(",") : images[0],
      },
    });
    return NextResponse.json(collection, {status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", {status: 500});
  }
};
