import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Climeong",
  description: "클라이머의, 클라이머에 의한, 클라이머를 위한",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="relative flex flex-col font-pretendard font-bold">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
