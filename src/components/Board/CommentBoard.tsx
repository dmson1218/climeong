import type { Comment } from "@/types/comment";
import renderSkeleton from "@/utils/renderSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CommentBoardProps {
  postId: string;
}

const LIMIT = 3;

const CommentBoard = ({ postId }: CommentBoardProps) => {
  const nicknameRef = useRef<HTMLTextAreaElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: "dummy-1",
      postId: "",
      nickname: "",
      content: "",
      createdAt: "",
    },
    {
      _id: "dummy-2",
      postId: "",
      nickname: "",
      content: "",
      createdAt: "",
    },
    {
      _id: "dummy-3",
      postId: "",
      nickname: "",
      content: "",
      createdAt: "",
    },
  ]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      if (!res.ok) throw new Error("댓글을 가져오는 중 오류가 발생했습니다.");
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async (nickname: string, content: string) => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname,
          content: content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`댓글 작성 실패: ${errorData.error}`);
      } else {
        await fetchComments();
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
      alert("댓글 생성에 실패했습니다.");
    }
  };

  const totalPages = Math.ceil(comments.length / LIMIT);
  const pagedComments = comments.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT,
  );

  return (
    <div className="w-full py-4 font-normal">
      <div className="flex h-10 w-full resize-none overflow-hidden rounded-md border border-gray-300">
        <textarea
          ref={nicknameRef}
          className="m-2 h-6 w-20 flex-shrink-0 resize-none overflow-x-auto whitespace-nowrap border-none outline-none"
          wrap="off"
          placeholder="닉네임"
        />
        <p className="my-2 h-6 border-l border-gray-300" />
        <textarea
          ref={commentRef}
          className="m-2 h-6 w-full resize-none overflow-x-auto whitespace-nowrap border-none outline-none"
          wrap="off"
          placeholder="댓글을 입력하세요"
        />
        <button
          className="h-full w-14 flex-shrink-0 cursor-pointer border-l border-gray-300 bg-gray-100 text-black"
          onClick={() => {
            const nickname = nicknameRef.current?.value.trim();
            const content = commentRef.current?.value.trim();

            if (!nickname || !content) {
              alert("닉네임과 댓글 내용을 입력해 주세요.");
              return;
            }

            handleCommentSubmit(nickname, content);
            nicknameRef.current!.value = "";
            commentRef.current!.value = "";
          }}
        >
          등록
        </button>
      </div>
      <div className="flex-center my-4 flex-col gap-4">
        {pagedComments.map((comment) => (
          <div key={comment._id} className="flex w-full flex-col gap-2">
            {renderSkeleton(
              isLoading,
              <div className="h-6 w-32 font-medium">{comment.nickname}</div>,
            )}
            {renderSkeleton(
              isLoading,
              <div className="min-h-6 w-full">{comment.content}</div>,
            )}
          </div>
        ))}
      </div>
      <div className="flex-center gap-2">
        <button
          aria-label="Prev"
          className="flex-center size-9 rounded-lg border bg-gray-100 p-1 disabled:cursor-default disabled:bg-white"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-center size-9 rounded-lg border p-1">
          {currentPage}
        </div>
        <button
          aria-label="Next"
          className="flex-center size-9 rounded-lg border bg-gray-100 p-1 disabled:cursor-default disabled:bg-white"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CommentBoard;
