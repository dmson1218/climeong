"use client";

import { useState } from "react";
import { BoardWrapper } from "@/components/MainBoard";

export default function NewsCreatePage() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleSubmit = async () => {
        if (!title || !content) {
            alert("제목과 내용을 입력해 주세요.");
            return;
        }

        try {
            const response = await fetch("/api/news", {
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
                window.location.href = "/news";
            }
        } catch (error) {
            console.error("게시물 생성 중 오류 발생:", error);
            alert("게시물 생성에 실패했습니다.");
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid z-10 px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">최신 소식</div>
                <div className="grow flex flex-col items-center gap-3">
                    <input
                        type="text"
                        className="w-full lg:w-3/4 border-2 border-slate-300 rounded p-2"
                        placeholder="제목을 입력해 주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full lg:w-3/4 grow border-2 border-slate-300 rounded p-2"
                        placeholder="내용을 입력해 주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="w-full lg:w-3/4 flex justify-end">
                        <button onClick={handleSubmit}>글쓰기</button>
                    </div>
                </div>
            </BoardWrapper>
        </div>
    );
}
