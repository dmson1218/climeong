import type { Metadata } from "next";
import "./globals.css";
import Category from "@/components/Category";
import Footer from "@/components/Footer";

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
            <body className="min-h-screen flex flex-col">
                <div className="h-36 flex flex-col">
                    <header className="grow flex-center text-4xl border-b border-gray-300">
                        클라이멍
                    </header>
                    <Category />
                </div>
                {children}
                <Footer />
            </body>
        </html>
    );
}
