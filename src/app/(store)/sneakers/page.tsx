import React from "react";
import Recommended from "@/app/(store)/components/Recommended";
import prisma from "@/prisma";

const Sneakers = async () => {
  const collections = await prisma.collection.findMany();
  const productListFirst = await prisma.productsOnCollections.findMany({
    where: {
      collectionId: collections[0].id,
    },
    include: {
      product: true,
    },
  });
  return (
    <div className="mx-14 py-6">
      <Recommended productListFirst={productListFirst} />
    </div>
  );
};

export default Sneakers;
