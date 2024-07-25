"use client";
import React, {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {ProductType, UserType} from "@/lib/types";
import axios from "axios";
import Loader from "@/app/admin/components/Loader";
import BigProductCard from "@/app/(store)/components/BigProductCard";
import {getProductDetails} from "@/lib/actions";
import Link from "next/link";

const WishlistPage = () => {
  const {user} = useUser();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/comstomers");
      if (res.status === 200) {
        setSignedInUser(res.data);
      }
    } catch (err) {
      console.log("[users_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);


  // console.log(signedInUser?.wishlist)
  const getWishlistProducts = async () => {
    setLoading(true);
    if (!signedInUser) return;
    const wishlistProducts = await Promise.all(
      signedInUser.wishlist && signedInUser.wishlist !== "" ? signedInUser.wishlist.split(",").map(async (productId) => {
        return await getProductDetails(productId);
      }) : []
    );
    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);
  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  return loading ? (
    <Loader/>
  ) : (
    <div className="px-10 py-12">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-semibold">Your Wishlist</p>
        <Link href="/" className="border rounded text-body-bold bg-white p-2 hover:bg-black hover:text-white">
          Back to Home
        </Link>
      </div>
      <hr className="my-6"/>
      {wishlist.length === 0 && <p>No items in your wishlist</p>}
      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <BigProductCard key={product.id} product={product} updateSignedInUser={updateSignedInUser}/>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
