"use client";
import React, {useEffect, useState} from "react";
import {Heart, Clipboard, ShoppingCart, Menu, Search, ShoppingBag, User, Home} from "lucide-react";
import {UserButton, useUser} from "@clerk/nextjs";
import Link from "next/link";
import {Drawer} from "antd";
import useCart from "@/lib/hooks/useCart";
import {usePathname} from "next/navigation";

const Header = () => {
  const {user} = useUser();
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const pathname = usePathname()

  //用于监听页面路径变化，变化后就关闭drawer
  useEffect(() => {
    onClose();
  }, [pathname])

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="border border-b-gray-200 bg-white p-2">
      <div className="flex justify-between items-center mx-14">
        <Drawer
          title="AISNK"
          placement="left"
          closable={false}
          style={{color: "black"}}
          onClose={onClose}
          open={open}
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex gap-2 items-center text-gray-600 text-lg font-semibold hover:text-gray-900">
              <Home/>
              <p>Home</p>
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="flex gap-2 items-center text-gray-600 text-lg font-semibold hover:text-gray-900"
            >
              <Heart/>
              <p>Wish List</p>
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="flex gap-2 items-center text-gray-600 text-lg font-semibold hover:text-gray-900"
            >
              <Clipboard/>
              <p>Orders</p>
            </Link>
          </div>
        </Drawer>
        <button onClick={showDrawer}>
          <Menu/>
        </button>
        <Link href="/">
          <div className="text-3xl font-semibold ml-24">AISNK</div>
        </Link>
        <div className="flex gap-4 justify-center items-center">
          <Search/>
          <Link
            href="/cart"
            className="flex items-center gap-3 border rounded px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
          >
            <ShoppingCart/>
            <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
          </Link>
          {user ? (
            <UserButton/>
          ) : (
            <Link href="/sign-in">
              <User/>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
