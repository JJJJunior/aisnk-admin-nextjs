import React from "react";
import Image from "next/image";

interface ProductPros {
  src: string;
  alt: string;
  title: string;
  price: number;
  isNew: boolean;
}
const ProductCard: React.FC<ProductPros> = ({ isNew, price, title, alt, src }) => {
  return (
    <div className="bg-white w-55 h-65 overflow-hidden flex flex-col justify-center p-2">
      <div className="flex justify-between items-center w-full relative">
        {isNew && (
          <div className="px-1 border border-gray-400 text-gray-400 text-sm italic absolute top-0 left-0">New</div>
        )}
      </div>
      <Image src={src} alt={alt} width={150} height={170} />
      <div>
        <div>US: ${price}</div>
      </div>
      <div className="w-24 overflow-hidden text-ellipsis whitespace-nowrap">
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
