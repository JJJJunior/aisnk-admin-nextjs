import React from "react";
import ProductCard from "../components/ProductCard";
import { CollectionType } from "@/lib/types";
import { getProductsOnCollections } from "@/lib/actions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface RowProductsOnCollectionProps {
  collection: CollectionType;
}

const RowProductsOnCollection: React.FC<RowProductsOnCollectionProps> = async ({ collection }) => {
  const productList = await getProductsOnCollections(collection.id);

  return (
    <div className="mx-14 py-6 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="text-xl font-semibold">{collection.title}</div>
        <Link href={`/collections/${collection.id}`}>
          <div className="text-gray-400 flex gap-2">
            <p>See More</p>
            <span>
              <ChevronRight />
            </span>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-10 max-2xl:grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3">
        {productList.length > 0
          ? productList.map((productList) => (
              <ProductCard
                id={productList.product.id}
                key={productList.product.id}
                src={productList.product.images.split(",")[0]}
                alt={productList.product.title}
                title={productList.product.title}
                price={productList.product.price}
                // 如果tags不存在则返回false，如果有tags并且找到new返回true
                isNew={
                  productList.product.tags
                    ? productList.product.tags.split(",").indexOf("New") > -1
                      ? true
                      : false
                    : false
                }
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default RowProductsOnCollection;
