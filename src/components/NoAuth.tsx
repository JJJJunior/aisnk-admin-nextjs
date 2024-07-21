"use client";
import { useRouter } from "next/navigation";

const NoAuth = () => {
  const router = useRouter();
  return router.push("/sign-in");
};

export default NoAuth;
