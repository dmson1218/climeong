"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import type { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostLinkWithDate from "../Link.tsx/PostLinkWithDate";

interface PostListBoardProps {
  boardType: string;
  boardTitle: string;
}

const PostListBoard = ({ boardType, boardTitle }: PostListBoardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState<Post[]>(
    Array.from({ length: 5 }).map((_, idx) => ({
      _id: `dummy-${idx}`,
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
    })),
  );
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
        setIsLoading(false);
        setPostList(data);
      });

    updatePostsToShow();
    window.addEventListener("resize", updatePostsToShow);

    return () => {
      window.removeEventListener("resize", updatePostsToShow);
    };
  }, [boardType]);

  return (
    <div className="layout mt-20 min-h-[calc(100vh-8rem)] md:mt-24 md:min-h-[calc(100vh-9rem)]">
      <BoardWrapper>
        <div className="flex-center mb-4 h-12 text-xl">{boardTitle}</div>
        <div className="flex grow flex-col items-center">
          {postList.slice(0, postsToShow).map((post) => (
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
                className="m-4 border-gray-300 md:mx-0 md:my-8"
              />
            </div>
          ))}
        </div>
        <div className="mx-auto flex w-full justify-end p-3 md:w-3/4 lg:w-3/5">
          <Link href={`/${boardType}/create`}>글쓰기</Link>
        </div>
      </BoardWrapper>
    </div>
  );
};

export default PostListBoard;
