import React from "react";
import { Menu, Search, ShoppingBag, ShoppingBasket, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <div className="border border-b-gray-200 bg-white">
      <div className="flex justify-between items-center mx-14">
        <Menu />
        <div className="text-3xl font-semibold ml-20">AISNK</div>
        <div className="flex gap-4">
          <Search />
          <User />
          <ShoppingBag />
        </div>
      </div>
    </div>
  );
};

export default Header;
