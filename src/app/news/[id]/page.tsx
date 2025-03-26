"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BoardWrapper } from "@/components/MainBoard";
import { FormatContent } from "@/components/FormatContent";

export default function PostPage() {
    const { id } = useParams();
    const [news, setNews] = useState<{ title: string; content: string } | null>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/news/${id}`);
                if (!res.ok) throw new Error("게시물을 찾을 수 없습니다.");
                const data = await res.json();
                setNews(data);
            } catch (error) {
                console.error(error);
                // 404 페이지 리다이렉트 기능 추가해야 함
            }
        }

        if (id) fetchPost();
    }, [id]);

    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                {news && (
                    <>
                        <div className="my-3 flex-center text-xl mb-4">{news.title}</div>
                        <div className="w-full md:w-3/4 lg:w-3/5 p-3 mx-auto">
                            <FormatContent content={news.content} />
                        </div>
                    </>
                )}
            </BoardWrapper>
        </div>
    );
}
