"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import { FormatContent } from "@/components/FormatContent";
import type { Comment } from "@/types/comment";
import renderSkeleton from "@/utils/renderSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PostBoardProps {
  boardType: string;
}

const LIMIT = 2;

const PostBoard = ({ boardType }: PostBoardProps) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const createDummyComments = useCallback(
    () =>
      Array.from({ length: LIMIT }).map((_, idx) => ({
        _id: `dummy-${idx}`,
        postId: "a",
        nickname: "a",
        content: "a",
        createdAt: new Date().toISOString(),
      })),
    [],
  );

  const [comments, setComments] = useState<Comment[]>(createDummyComments());

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}?postType=${boardType}`);
        if (!res.ok) throw new Error("정보를 가져오는 중 오류가 발생했습니다.");
        const data = await res.json();
        setIsLoading(false);
        setPost(data);
      } catch (error) {
        console.error(error);
        // 404 페이지 리다이렉트 기능 추가해야 함
      }
    }

    if (id) fetchPost();
  }, [boardType, id]);

  return (
    <div className="layout mt-20 flex min-h-[calc(100vh-8rem)] md:mt-24 md:min-h-[calc(100vh-9rem)]">
      <BoardWrapper>
        {renderSkeleton(
          isLoading,
          <div className="flex-center mx-auto mb-8 mt-3 min-h-6 w-1/2 text-xl font-medium">
            {post.title}
          </div>,
        )}
        <div className="mx-4 grow font-normal md:mx-0">
          <FormatContent isLoading={isLoading} content={post.content} />
        </div>
        <div className="w-full p-4 font-normal md:px-0">
          <div className="flex h-10 w-full resize-none rounded-md border border-gray-300 p-2">
            <textarea
              className="grow resize-none border-none outline-none"
              placeholder="댓글을 입력하세요..."
            />
            <button
              className={`w-8 ${comments.length > 0 ? "cursor-pointer text-black" : "cursor-default text-gray-400"}`}
              onClick={() => {
                const textarea = document.querySelector("textarea");
                if (textarea) {
                  setComments([]);
                  textarea.value = "";
                }
              }}
            >
              입력
            </button>
          </div>
          <div className="flex-center my-4 flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment._id} className="flex w-full flex-col gap-2">
                {renderSkeleton(
                  true,
                  <div className="h-6 w-1/3 md:w-1/5">{comment.content}</div>,
                )}
                {renderSkeleton(
                  true,
                  <div className="h-6 w-full md:w-2/3">{comment.content}</div>,
                )}
              </div>
            ))}
          </div>
          <div className="flex-center gap-2">
            <button
              aria-label="Prev"
              className="flex-center size-9 rounded-lg border bg-gray-50 p-1"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-center size-9 rounded-lg border p-1">1</div>
            <button
              aria-label="Next"
              className="flex-center size-9 rounded-lg border bg-gray-50 p-1"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </BoardWrapper>
    </div>
  );
};

export default PostBoard;
