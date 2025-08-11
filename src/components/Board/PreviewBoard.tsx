"use client";

import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import PostLinkWithDate from "../Link/PostLinkWithDate";
import BoardWrapper from "./BoardWrapper";

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
    fetch(`/api/posts?postType=${boardType}&limit=3`)
      .then((res) => res.json())
      .then((data) => {
        setPostList(data);
        setIsLoading(false);
      });
  }, [boardType]);

  return (
    <div className="mt-2">
      <BoardWrapper>
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
              className="my-4 border-gray-300 md:my-6"
            />
          </div>
        ))}
      </BoardWrapper>
    </div>
  );
};

export default PreviewBoard;
