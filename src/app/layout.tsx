import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "My Next.js App Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="2xl font-pretendard relative flex flex-col font-bold">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
