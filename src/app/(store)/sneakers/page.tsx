import React from "react";
import prisma from "@/prisma";
import Topbar from "@/app/(store)/components/Topbar";
import MainCarousel from "@/app/(store)/components/MainCarousel";
import RowProductsOnCollection from "../components/RowProductsOnCollection";
import ExploreMore from "../components/ExploreMore";

const Sneakers = async () => {
  const collections = await prisma.collection.findMany();
  return (
    <>
      <Topbar />
      <MainCarousel />
      {collections &&
        collections.length > 0 &&
        collections.map((collection) => <RowProductsOnCollection collection={collection} />)}
      <ExploreMore />
    </>
  );
};

export default Sneakers;
