"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import { useState } from "react";

interface CreateBoardProps {
  boardType: string;
  boardTitle: string;
}

const CreateBoard = ({ boardType, boardTitle }: CreateBoardProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch(`/api/${boardType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`게시물 작성 실패: ${errorData.error}`);
      } else {
        alert("게시물이 성공적으로 생성되었습니다.");
        window.location.href = `/${boardType}`;
      }
    } catch (error) {
      console.error("게시물 생성 중 오류 발생:", error);
      alert("게시물 생성에 실패했습니다.");
    }
  };

  return (
    <div className="mt-20 flex min-h-[calc(100vh-5rem-60px)] px-4 lg:px-10">
      <BoardWrapper>
        <div className="flex-center my-3 text-xl">{boardTitle}</div>
        <div className="flex grow flex-col items-center gap-3 px-5">
          <input
            type="text"
            className="w-full rounded border-2 border-slate-300 p-2 md:w-3/4 lg:w-3/5"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full grow rounded border-2 border-slate-300 p-2 md:w-3/4 lg:w-3/5"
            placeholder="내용을 입력해 주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mx-auto flex w-full justify-end p-3 md:w-3/4 lg:w-3/5">
          <button onClick={handleSubmit}>글쓰기</button>
        </div>
      </BoardWrapper>
    </div>
  );
};

export default CreateBoard;
