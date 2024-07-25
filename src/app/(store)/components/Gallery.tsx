"use client";
import React, { useState } from "react";
import Image from "next/image";
interface GalleryProps {
  productMedia: string;
}
const Gallery: React.FC<GalleryProps> = ({ productMedia }) => {
  const [mainImage, setMainImage] = useState(productMedia.split(",")[0]);
  return (
    <div className="flex flex-col gap-3 max-w[500px]">
      <Image
        src={mainImage}
        alt="image"
        width={500}
        height={500}
        className="w-96 h-96 rounded shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.split(",").map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="product"
            width={200}
            height={200}
            className={`w-20 h-20 rounded object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-black" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
