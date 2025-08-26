"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import PostLinkWithDate from "@/components/Link/PostLinkWithDate";
import type { Post } from "@/types/post";
import { useCallback, useEffect, useRef, useState } from "react";

interface PostListBoardProps {
  boardType: string;
  boardTitle: string;
}

const LIMIT = 10;

const PostListBoard = ({ boardType, boardTitle }: PostListBoardProps) => {
  const [afterId, setAfterId] = useState<string | null>(null);
  const [hasMoreAfter, setHasMoreAfter] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const loaderAfterRef = useRef<HTMLAnchorElement>(null);

  const createDummyPosts = useCallback(
    () =>
      Array.from({ length: LIMIT }).map((_, idx) => ({
        _id: `dummy-${idx}`,
        title: "",
        content: "",
        createdAt: new Date().toISOString(),
      })),
    [],
  );

  const [postList, setPostList] = useState<Post[]>(createDummyPosts());

  const fetchPosts = useCallback(
    async (params: { beforeId?: string; afterId?: string }) => {
      const url = new URL(`/api/posts`, location.origin);
      url.searchParams.set("postType", boardType);
      url.searchParams.set("limit", String(LIMIT));
      if (params.afterId) url.searchParams.set("afterId", params.afterId);

      const res = await fetch(url.toString());
      return res.json();
    },
    [boardType],
  );

  const saveScrollState = useCallback(() => {
    history.replaceState(
      {
        lastId: afterId || undefined,
        scrollY: window.scrollY,
      },
      "",
      location.href,
    );
  }, [afterId]);

  useEffect(() => {
    window.addEventListener("scrollend", saveScrollState);

    return () => {
      window.removeEventListener("scrollend", saveScrollState);
    };
  }, [saveScrollState]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const lastId = history.state?.lastId ?? null;
      const scrollY = history.state?.scrollY ?? 0;

      if (!lastId) {
        const data = await fetchPosts({});
        setPostList(data);
        setAfterId(data.length > 0 ? data[data.length - 1]._id : null);
        setHasMoreAfter(data.length === LIMIT);
        setLoading(false);
        return;
      }

      let accumulated: Post[] = [];
      let cursor: string | undefined = undefined;
      let shouldStop = false;

      while (!shouldStop) {
        const data = await fetchPosts({ afterId: cursor });
        if (data.length === 0) break;

        accumulated = [...accumulated, ...data];
        cursor = data[data.length - 1]._id;

        if (data[0]._id >= lastId && data[data.length - 1]._id <= lastId) {
          shouldStop = true;
        }

        if (accumulated.length > 1000) break;
      }

      setPostList(accumulated);
      setAfterId(cursor ?? null);
      setHasMoreAfter(accumulated.length % LIMIT === 0);
      setLoading(false);

      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: "auto" });
      });
    })();
  }, [fetchPosts]);

  const loadMoreAfter = useCallback(async () => {
    if (isLoading || !hasMoreAfter) return;

    setLoading(true);
    setPostList((prev) => [...prev, ...createDummyPosts()]);

    const data = await fetchPosts(afterId ? { afterId } : {});

    setPostList((prev) => {
      const filtered = prev.filter((post) => !post._id.startsWith("dummy-"));
      return [...filtered, ...data];
    });

    setAfterId(data.length > 0 ? data[data.length - 1]._id : null);
    setHasMoreAfter(data.length === LIMIT);
    setLoading(false);
  }, [isLoading, hasMoreAfter, fetchPosts, createDummyPosts, afterId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreAfter();
        }
      },
      { threshold: 0 },
    );

    const current = loaderAfterRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMoreAfter, isLoading]);

  return (
    <div className="layout mt-20 min-h-[calc(100vh-8rem)] md:mt-24 md:min-h-[calc(100vh-9rem)]">
      <BoardWrapper>
        <div className="flex-center mb-4 h-12 text-xl">{boardTitle}</div>
        <div className="mx-auto flex w-full max-w-5xl grow flex-col items-center">
          {postList.map((post, index) => (
            <div key={post._id + "-postListWrapper"} className="w-full">
              <PostLinkWithDate
                key={post._id + "-postList"}
                ref={index === postList.length - 1 ? loaderAfterRef : null}
                boardType={boardType}
                _id={post._id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                isLoading={post._id.startsWith("dummy-") && isLoading}
              />
              <hr
                key={post._id + "-postListDivider"}
                className="my-4 border-gray-300 md:mx-0 md:my-8"
              />
            </div>
          ))}
        </div>
      </BoardWrapper>
    </div>
  );
};

export default PostListBoard;
