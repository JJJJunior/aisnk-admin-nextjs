import React from "react";
import Notification from "@/app/(store)/components/Notification";
import Footer from "@/app/(store)/components/Footer";
import Header from "@/app/(store)/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      <div className="h-full">
        <Notification />
        <Header />
        <div className="bg-grey-1">{children}</div>
        <Footer />
      </div>
    </AntdRegistry>
  );
}
