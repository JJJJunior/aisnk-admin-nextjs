import React from "react";
import prisma from "@/prisma";
import Gallery from "@/app/(store)/components/Gallery";
import ProductInfo from "@/app/(store)/components/ProductInfo";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
  });
  // console.log(product);
  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={product ? product.images : ""} />
        <ProductInfo productInfo={product} />
      </div>
      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        {/* <div className="flex flex-wrap px-6 gap-16 max-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default ProductDetail;
