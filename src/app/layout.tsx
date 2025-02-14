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
            <body className="h-screen flex flex-col">
                <header className="h-[10%] flex-center text-2xl border-b border-gray-500">
                    클라이멍
                </header>
                {children}
            </body>
        </html>
    );
}
