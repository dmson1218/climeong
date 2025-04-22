"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BoardWrapper from "@/components/Board/BoardWrapper";
import type { Post } from "@/types/post";

interface PostListBoardProps {
    boardType: string;
    boardTitle: string;
}

const PostListBoard = ({ boardType, boardTitle }: PostListBoardProps) => {
    const [postList, setPostList] = useState<Post[]>([]);
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
        fetch(`/api/${boardType}?count=10`)
            .then((res) => res.json())
            .then((data) => {
                setPostList(data);
            });

        updatePostsToShow();
        window.addEventListener("resize", updatePostsToShow);

        return () => {
            window.removeEventListener("resize", updatePostsToShow);
        };
    }, [boardType]);

    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">{boardTitle}</div>
                <div className="grow flex flex-col items-center gap-1">
                    {postList.slice(0, postsToShow).map((post) => (
                        <Link
                            key={post._id}
                            href={`/${boardType}/${post._id}`}
                            className="w-full md:w-3/4 lg:w-3/5 mx-auto flex justify-between p-3 rounded hover:bg-slate-100"
                        >
                            <div>{post.title}</div>
                            <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                        </Link>
                    ))}
                </div>
                <div className="w-full md:w-3/4 lg:w-3/5 mx-auto p-3 flex justify-end">
                    <Link href={`/${boardType}/create`}>글쓰기</Link>
                </div>
            </BoardWrapper>
        </div>
    );
};

export default PostListBoard;
