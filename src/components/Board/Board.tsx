"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import PostLink from "@/components/Link/PostLink";
import type { Post } from "@/types/post";
import { useEffect, useState } from "react";

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
      createdAt: new Date().toISOString(),
    })),
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
      <div className="flex-center my-auto flex-col gap-4">
        <div className="flex-center text-xl">{boardTitle}</div>
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
      </div>
    </BoardWrapper>
  );
};

export default Board;
