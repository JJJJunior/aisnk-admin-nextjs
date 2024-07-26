import React from "react";
import axios from "axios";
import BigProductCard from "@/app/(store)/components/BigProductCard";
import Link from "next/link";

const SearchDetailPage = async ({ params }: { params: { query: string } }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search/${params.query}`);

  const searchedProducts = res.data;

  return (
    <div className="px-10 py-12 max-sm:px-3">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-semibold">Search results for "{params.query}"</p>
        <Link href="/" className="border rounded text-body-bold bg-white p-2 hover:bg-black hover:text-white">
          Back to Home
        </Link>
      </div>
      <hr className="my-6" />
      <div className="flex flex-wrap justify-start gap-16">
        {!searchedProducts || (searchedProducts.length === 0 && <p className="text-body-bold my-5">No result found</p>)}
        {searchedProducts?.map((product: any) => (
          <BigProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchDetailPage;
