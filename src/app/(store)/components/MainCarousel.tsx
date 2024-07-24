import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const contentStyle: React.CSSProperties = {
  height: "380px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const imagesList = [
  {
    src: "/images/1d650d78-f107-41f3-b637-aec49743889f.jpg",
    alt: "Slide 1",
    id: "slide1",
  },
  {
    src: "/images/8c90ec32-992e-4f7e-99af-1bf4cc9ae89c.jpg",
    alt: "Slide 2",
    id: "slide2",
  },
  {
    src: "/images/04826624-bcdd-46c6-88ea-b1563154e637.jpg",
    alt: "Slide 3",
    id: "slide3",
  },
  {
    src: "/images/ab46fc25-7e4f-4c27-8881-df801490487b.jpg",
    alt: "Slide 4",
    id: "slide4",
  },
  {
    src: "/images/authentic-img-3.jpg",
    alt: "Slide 5",
    id: "slide5",
  },
];

const MainCarousel: React.FC = () => (
  <Carousel autoplay arrows dotPosition="bottom" className="w-full">
    {imagesList.map((image) => (
      <div className="h-80 mx-auto w-full flex" key={image.id}>
        <div className="flex gap-4 h-full justify-center">
          <Image src={image.src} width={520} height={420} alt={image.alt} key={image.id} className="items-center" />
          {/* <Image src={image.src} width={520} height={420} alt={image.alt} key={image.id} className="items-center" /> */}
        </div>
      </div>
    ))}
  </Carousel>
);

export default MainCarousel;
