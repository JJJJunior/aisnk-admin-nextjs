"use client";
import React from "react";
import Link from "next/link";
import useCart from "@/lib/hooks/useCart";
import { useEffect } from "react";
import { Smile } from "lucide-react";
const SuccessPayment = () => {
  const cart = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    cart.clearCart();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <p className="text-3xl text-red-500 font-semibold">Successful Payment</p>
      <div className="flex gap-4">
        <p>Thank your for you puchase</p>
        <Smile />
      </div>
      <Link href="/" className="border rounded text-body-bold text-white bg-black p-2 hover:bg-gray-400">
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessPayment;
