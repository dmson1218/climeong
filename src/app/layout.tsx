import type { Metadata } from "next";
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
            <body className="min-h-screen flex flex-col font-reko">
                <div className="pt-1 h-20 flex justify-between">
                    <div className="w-32 ml-4 flex-center">
                        <div className="text-2xl cursor-pointer">클라이멍</div>
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
