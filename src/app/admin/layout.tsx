"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, ConfigProvider, message } from "antd";
import Navbar from "@/app/admin/components/Navbar";
import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "./components/Loader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  //鉴权流程
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // console.log(userId);
  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      if (res.status === 200) {
        // console.log(res.data);
      }
    } catch (err) {
      console.error(err);
      message.error("No Permission to Access!");
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#00b96b",
          borderRadius: 2,

          // 派生变量，影响范围小
          colorBgContainer: "#fff",
        },
      }}
    >
      <AntdRegistry>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-4 shadow-md">
              <div className="text-xl font-semibold">AISNK</div>
              <Navbar />
              <div>
                <SignedOut>
                  <Button type="primary">
                    <Link href="/sign-in">登录</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            <div className="flex-1 my-4">{children}</div>
          </div>
        </div>
      </AntdRegistry>
    </ConfigProvider>
  );
};
export default Layout;
