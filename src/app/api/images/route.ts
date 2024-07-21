import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/prisma";

export const POST = async (req: NextRequest) => {
    try {
        const {userId} = auth()
        if (!userId) {
            return new NextResponse("Unauthorized!", {status: 403})
        }
        const datalist = await req.json()
        // console.log(datalist)
        const res = datalist.map(async (item) => {
                await prisma.imageFile.create({
                    data: {
                        id: item.uid,
                        name: item.name,
                        size: item.size,
                        type: item.type,
                        savedUrl: {
                            create: {
                                imageSaveUrl: item.savedUrl.imageSaveUrl,
                                imageUrl: item.savedUrl.imageUrl,
                            }
                        },
                        lastModified: item.lastModified,
                        lastModifiedDate: item.lastModifiedDate,
                    }
                })
            }
        )
        // console.log(res)
        return new NextResponse("Success!", {status: 200})
    } catch (e) {
        console.log("[images_POST]", e)
        return new NextResponse("Internal error", {status: 500})
    }
}