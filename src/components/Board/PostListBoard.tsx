"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import PostLinkWithDate from "@/components/Link/PostLinkWithDate";
import type { Post } from "@/types/post";
import { useCallback, useEffect, useRef, useState } from "react";

interface PostListBoardProps {
  boardType: string;
  boardTitle: string;
}

const DUMMY_COUNT = 10;

const PostListBoard = ({ boardType, boardTitle }: PostListBoardProps) => {
  const limit = DUMMY_COUNT;

  const [afterDate, setAfterDate] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLAnchorElement>(null);

  const createDummyPosts = useCallback(
    () =>
      Array.from({ length: DUMMY_COUNT }).map((_, idx) => ({
        _id: `dummy-${idx}`,
        title: "",
        content: "",
        createdAt: new Date().toISOString(),
      })),
    [],
  );

  const [postList, setPostList] = useState<Post[]>(createDummyPosts());

  const fetchPosts = useCallback(
    async (afterDate?: string | null) => {
      const url = new URL(`/api/${boardType}`, window.location.origin);
      if (afterDate) url.searchParams.set("afterDate", afterDate);
      url.searchParams.set("limit", limit.toString());

      const res = await fetch(url.toString());
      return res.json();
    },
    [boardType, limit],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchPosts(null);
      setPostList(data);
      setAfterDate(data.length > 0 ? data[data.length - 1].createdAt : null);
      setHasMore(data.length === limit);
      setLoading(false);
    })();
  }, [fetchPosts, limit]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setLoading(true);
    setPostList((prev) => [...prev, ...createDummyPosts()]);

    const data = await fetchPosts(afterDate);

    setPostList((prev) => {
      const filtered = prev.filter((post) => !post._id.startsWith("dummy-"));
      return [...filtered, ...data];
    });

    setAfterDate(data.length > 0 ? data[data.length - 1].createdAt : null);
    setHasMore(data.length === limit);
    setLoading(false);
  }, [isLoading, hasMore, fetchPosts, limit, createDummyPosts, afterDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0,
      },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore]);

  return (
    <div className="layout mt-20 min-h-[calc(100vh-8rem)] md:mt-24 md:min-h-[calc(100vh-9rem)]">
      <BoardWrapper>
        <div className="flex-center mb-4 h-12 text-xl">{boardTitle}</div>
        <div className="mx-auto flex w-full max-w-3xl grow flex-col items-center">
          {postList.map((post, index) => (
            <div key={post._id + "-postListWrapper"} className="w-full">
              <PostLinkWithDate
                key={post._id + "-postList"}
                ref={index === postList.length - 1 ? loaderRef : null}
                boardType={boardType}
                _id={post._id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                isLoading={post._id.startsWith("dummy-") && isLoading}
              />
              <hr
                key={post._id + "-postListDivider"}
                className="m-4 border-gray-300 md:mx-0 md:my-8"
              />
            </div>
          ))}
        </div>
      </BoardWrapper>
    </div>
  );
};

export default PostListBoard;
