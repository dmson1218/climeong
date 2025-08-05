"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import CommentBoard from "@/components/Board/CommentBoard";
import { FormatContent } from "@/components/FormatContent";
import renderSkeleton from "@/utils/renderSkeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PostBoardProps {
  boardType: string;
}

const PostBoard = ({ boardType }: PostBoardProps) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

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
        <CommentBoard postId={id as string} />
      </BoardWrapper>
    </div>
  );
};

export default PostBoard;
