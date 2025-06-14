"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname();
  const links = [
    {
      id: "sneakers",
      title: "Sneakers",
      url: "/sneakers",
    },
    {
      id: "streetwear",
      title: "Streetwear",
      url: "/streetwear",
    },
    {
      id: "trending",
      title: "Trending",
      url: "/trending",
    },
  ];
  return (
    <div className="bg-white sticky top-0 z-10 h-12 flex justify-around items-center mx-14">
      {links.map((link, index) => (
        <div className=" h-full w-full  text-gray-400" key={index}>
          <Link
            href={link.url}
            className={`w-full h-full flex justify-center items-center transition duration-300 ease-in-out ${
              pathname === link.url && " border-b-2 border-b-black text-black"
            }`}
          >
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Topbar;
