"use client";

import { useEffect, useState } from "react";
import { Post } from "../api/posts/route";
import { BoardWrapper } from "@/components/MainBoard";
import Link from "next/link";

export default function Home() {
    const [news, setNews] = useState<Post[]>([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
            });
    }, []);

    return (
        <div className="min-h-[calc(100vh-5rem-60px)] grid z-10 px-4">
            <BoardWrapper>
                <div className="mt-3 mb-8 flex-center text-xl mb-4">최신 소식</div>
                <div className="grow flex flex-col gap-1">
                    {news.length > 0 &&
                        news.map((post) => (
                            <div key={post._id} className="flex-center">
                                {post.title}
                            </div>
                        ))}
                </div>
                <div className="flex justify-end">
                    <Link href="/news/create">글쓰기</Link>
                </div>
            </BoardWrapper>
        </div>
    );
}
