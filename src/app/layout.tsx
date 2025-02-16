import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import { Category } from "@/components/Category";
import MenuBar from "@/components/MenuBar";

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
            <body className="h-screen flex flex-col font-reko">
                <div className="h-20 pt-3 flex justify-between">
                    <div className="w-32 ml-4 flex-center">
                        <Link href="/" className="text-2xl cursor-pointer">
                            클라이멍
                        </Link>
                    </div>
                    <Category />
                    <MenuBar />
                </div>
                {children}
                <Footer />
            </body>
        </html>
    );
}
