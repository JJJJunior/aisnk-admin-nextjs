import { getProducts } from "@/lib/actions";
import React from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/types";

const ExploreMore = async () => {
  const products = await getProducts();
  return (
    <div className="mx-14 py-6 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="text-xl font-semibold">Explore More</div>
      </div>
      <div className="grid grid-cols-10 max-2xl:grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3">
        {products.length > 0
          ? products.map((product: ProductType) => (
              <ProductCard
                id={product.id}
                key={product.id}
                src={product.images.split(",")[0]}
                alt={product.title}
                title={product.title}
                price={product.price}
                // 如果tags不存在则返回false，如果有tags并且找到new返回true
                isNew={product.tags ? (product.tags.split(",").indexOf("New") > -1 ? true : false) : false}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ExploreMore;
