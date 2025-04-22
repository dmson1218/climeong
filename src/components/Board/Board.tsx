"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/types/post";
import BoardWrapper from "@/components/Board/BoardWrapper";
import PostLink from "@/components/PostLink";

interface BoardProps {
    boardType: string;
    boardTitle: string;
    count: number;
}

const Board = ({ boardType, boardTitle, count }: BoardProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [postList, setpostList] = useState<Post[]>(
        Array.from({ length: count }).map((_, idx) => ({
            _id: `dummy-${idx}`,
            title: "",
            content: "",
            createdAt: new Date(),
        }))
    );

    useEffect(() => {
        fetch(`/api/${boardType}?count=${count}`)
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                setpostList(data);
            });
    }, [boardType, count]);

    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">{boardTitle}</div>
            <div className="flex flex-col gap-1">
                {postList.map((post) => (
                    <PostLink
                        key={post._id}
                        boardType={boardType}
                        _id={post._id}
                        title={post.title}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </BoardWrapper>
    );
};

export default Board;
