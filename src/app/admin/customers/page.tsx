"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CustomersPage = () => {
  const { userId } = useAuth();
  const router = useRouter();
  if (!userId) {
    router.push("/sign-in");
  }
  return <div>CustomersPage</div>;
};

export default CustomersPage;
