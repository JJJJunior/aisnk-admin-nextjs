"use client";
import React, { useState } from "react";
import { ProductType } from "@/lib/types";
import HeartFavorite from "@/app/(store)/components/HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

interface ProductInfoProps {
  productInfo: ProductType;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productInfo }) => {
  const [selectedColor, setSelectedColor] = useState<string>(productInfo.colors?.split(",")[0]);
  const [selectedSize, setSelectedSize] = useState<string>(productInfo.sizes?.split(",")[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart();
  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-700">{productInfo.title}</p>
        <HeartFavorite productInfo={productInfo} />
      </div>
      <div className="flex gap-2">
        <p className="font-semibold text-gray-700">Category：</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>
      <p className="font-semibold">$ {productInfo.price}</p>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-gray-700">Description:</p>
        <p className="text-sm text-gray-600">{productInfo.description}</p>
      </div>
      {productInfo.colors?.split(",").length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Colors:</p>
          <div className="flex gap-2 flex-wrap">
            {productInfo.colors?.split(",").map((color, index) => (
              <p
                onClick={() => setSelectedColor(color)}
                key={index}
                className={`border border-black px-2 py-1 rounded cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
      {productInfo.sizes?.split(",").length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Sizes:</p>
          <div className="flex gap-2 flex-wrap">
            {productInfo.sizes?.split(",").map((size, index) => (
              <p
                onClick={() => setSelectedSize(size)}
                key={index}
                className={`border border-black px-2 py-1 rounded cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-gray-700">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-gray-400 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="hover:text-gray-400 cursor-pointer">{quantity}</p>
          <PlusCircle className="hover:text-gray-400 cursor-pointer" onClick={() => setQuantity(quantity + 1)} />
        </div>
      </div>
      <button
        onClick={() => {
          cart.addItem({ item: productInfo, quantity: quantity, color: selectedColor, size: selectedSize });
        }}
        className="outline text-base-bold py-2 rounded-sm hover:bg-black hover:text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
