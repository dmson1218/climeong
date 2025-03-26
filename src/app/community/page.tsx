"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Posts } from "../api/community/route";
import { BoardWrapper } from "@/components/MainBoard";

export default function CommunityPage() {
    const [postList, setPostList] = useState<Posts[]>([]);
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
        fetch("/api/community?count=10")
            .then((res) => res.json())
            .then((data) => {
                setPostList(data);
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
                <div className="my-3 flex-center text-xl mb-4">커뮤니티</div>
                <div className="grow flex flex-col items-center gap-1">
                    {postList.slice(0, postsToShow).map((post) => (
                        <Link
                            key={post._id}
                            href={`/post/${post._id}`}
                            className="w-full md:w-3/4 lg:w-3/5 mx-auto flex justify-between p-3 rounded hover:bg-slate-100"
                        >
                            <div>{post.title}</div>
                            <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                        </Link>
                    ))}
                </div>
                <div className="w-full md:w-3/4 lg:w-3/5 mx-auto p-3 flex justify-end">
                    <Link href="/community/create">글쓰기</Link>
                </div>
            </BoardWrapper>
        </div>
    );
}
