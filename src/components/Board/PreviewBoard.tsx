"use client";

import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import PostLinkWithDate from "../Link.tsx/PostLinkWithDate";

const PreviewBoard = ({ boardType }: { boardType: string }) => {
  const [posts, setPosts] = useState<Post[]>(
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
        setPosts(data);
        setIsLoading(false);
      });
  }, [boardType]);

  return (
    <div className="flex-center mx-8 my-4 grow flex-col md:mx-12">
      {posts.map((post) => (
        <div key={post._id + "-previewWrapper"} className="w-full">
          <PostLinkWithDate
            key={post._id + "-preview"}
            boardType={boardType}
            _id={post._id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            isLoading={isLoading}
            width="w-full"
          />
          <hr
            key={post._id + "-previewDivider"}
            className="my-4 w-full border-gray-300 md:my-8"
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewBoard;
