"use client";

import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import PostLinkWithDate from "../Link.tsx/PostLinkWithDate";

const PreviewBoard = ({ boardType }: { boardType: string }) => {
  const [postList, setPostList] = useState<Post[]>(
    Array.from({ length: 3 }).map((_, idx) => ({
      _id: `dummy-${idx}`,
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
    })),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/${boardType}?count=3`)
      .then((res) => res.json())
      .then((data) => {
        setPostList(data);
        setIsLoading(false);
      });
  }, [boardType]);

  return (
    <div className="mt-4 flex grow flex-col items-center md:mx-8">
      {postList.map((post) => (
        <div key={post._id + "-postListWrapper"} className="w-full">
          <PostLinkWithDate
            key={post._id + "-postList"}
            boardType={boardType}
            _id={post._id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            isLoading={isLoading}
          />
          <hr
            key={post._id + "-postListDivider"}
            className="m-4 border-gray-300 md:mx-4 md:my-8"
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewBoard;
