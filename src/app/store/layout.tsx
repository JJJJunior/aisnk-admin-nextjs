import React from "react";
import Notification from "@/app/store/components/Notification";
import Footer from "@/app/store/components/Footer";
import Header from "@/app/store/components/Header";
import Topbar from "@/app/store/components/Topbar";
import MainCarousel from "@/app/store/components/MainCarousel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Notification />
      <Header />
      <Topbar />
      <MainCarousel />
      <div className="bg-grey-1 h-full">{children}</div>
      <Footer />
    </div>
  );
}
