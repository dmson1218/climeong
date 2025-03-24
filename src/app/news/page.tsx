"use client";

import { useEffect, useState } from "react";
import { Post } from "./api/route";
import { BoardWrapper } from "@/components/MainBoard";
import Link from "next/link";

export default function NewsPage() {
    const [news, setNews] = useState<Post[]>([]);
    const [postsToShow, setPostsToShow] = useState<number>(10);

    const updatePostsToShow = () => {
        const height = window.innerHeight;
        if (height >= 800) {
            setPostsToShow(10);
        } else if (height >= 600) {
            setPostsToShow(7);
        } else {
            setPostsToShow(5);
        }
    };

    useEffect(() => {
        fetch(`/news/api?count=10`)
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
            });

        updatePostsToShow();
        window.addEventListener("resize", updatePostsToShow);

        return () => {
            window.removeEventListener("resize", updatePostsToShow);
        };
    }, []);

    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">최신 소식</div>
                <div className="grow flex flex-col gap-1">
                    {news.slice(0, postsToShow).map((post) => (
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
