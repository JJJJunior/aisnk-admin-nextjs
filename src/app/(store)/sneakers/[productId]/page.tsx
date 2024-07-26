import React from "react";
import Gallery from "@/app/(store)/components/Gallery";
import ProductInfo from "@/app/(store)/components/ProductInfo";
import { ProductType } from "@/lib/types";
import { getProductDetails, getRelatedProducts } from "@/lib/actions";
import BigProductCard from "../../components/BigProductCard";
import Link from "next/link";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const product = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <div className="px-10 py-12 max-sm:px-3">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-semibold">Product Details</p>
        <Link href="/" className="border rounded text-body-bold bg-white p-2 hover:bg-black hover:text-white">
          Back to Home
        </Link>
      </div>
      <hr className="my-6" />
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={product ? product.images : ""} />
        <ProductInfo productInfo={product} />
      </div>
      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-2xl font-semibold">Related Products</p>
        <div className="flex flex-wrap px-6 gap-16 max-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <BigProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
