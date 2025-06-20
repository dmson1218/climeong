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
            <body className="relative flex flex-col font-reko">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
