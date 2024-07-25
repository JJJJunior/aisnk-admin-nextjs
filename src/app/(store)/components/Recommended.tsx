import React from "react";
import { ProductsOnCollections } from "@prisma/client";

interface DataList {
  dataList: ProductsOnCollections[];
}

const Recommended: React.FC<DataList> = ({ dataList }) => {
  return (
    <div>
      <h1>Recently Viewed</h1>
      <div className="flex flex-wrap">{/* Product cards */}</div>
    </div>
  );
};

export default Recommended;
