"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/sneakers");
  }, [router]);
};

export default page;
