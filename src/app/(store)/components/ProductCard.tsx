import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductPros {
  id: string;
  src: string;
  alt: string;
  title: string;
  price: number;
  isNew: boolean;
  key: string;
}
const ProductCard: React.FC<ProductPros> = ({ id, isNew, price, title, alt, src }) => {
  return (
    <div className="p-1 w-40">
      <div className="flex justify-between items-center relative">
        {isNew && (
          <div className="px-1 border border-gray-400 text-gray-600 text-xs italic absolute top-0 z-20 left-0">New</div>
        )}
      </div>
      <Link href={`/sneakers/${id}`}>
        <Image
          src={src}
          alt={alt}
          width={480}
          height={520}
          className="rounded shadow-md w-full transition duration-800 ease-in-out transform hover:brightness-50 hover:contrast-150"
        />
      </Link>
      <div className="w-full mt-2">
        <div className="text-sm">US: ${price}</div>
        <div className="overflow-hidden w-full">
          <p className="text-xs text-gray-500 ellipsis-3">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
