import React from "react";
import prisma from "@/prisma";
import ProductCard from "../components/ProductCard";
import Topbar from "@/app/(store)/components/Topbar";
import MainCarousel from "@/app/(store)/components/MainCarousel";

const Sneakers = async () => {
  const collections = await prisma.collection.findMany();
  const productListFirst = await prisma.productsOnCollections.findMany({
    where: {
      collectionId: collections[1].id,
    },
    include: {
      product: true,
    },
  });

  return (
    <>
      <Topbar />
      <MainCarousel />
      <div className="mx-14 py-6 flex flex-col gap-2">
        <div className="text-xl">{collections[1].title}</div>
        <div className="flex">
          {productListFirst.length > 0
            ? productListFirst.map((productListFirst) => (
                <ProductCard
                  id={productListFirst.product.id}
                  key={productListFirst.product.id}
                  src={productListFirst.product.images.split(",")[0]}
                  alt={productListFirst.product.title}
                  title={productListFirst.product.title}
                  price={productListFirst.product.price}
                  // 如果tags不存在则返回false，如果有tags并且找到new返回true
                  isNew={
                    productListFirst.product.tags
                      ? productListFirst.product.tags.split(",").indexOf("New") > -1
                        ? true
                        : false
                      : false
                  }
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Sneakers;
