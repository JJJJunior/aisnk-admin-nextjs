"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const HomePage = () => {
  const { userId } = useAuth();
  const router = useRouter();
  if (!userId) {
    router.push("/sign-in");
  }

  return <div>HomePage</div>;
};

export default HomePage;
