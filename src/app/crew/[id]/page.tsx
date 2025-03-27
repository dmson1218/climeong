"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BoardWrapper } from "@/components/MainBoard";
import { FormatContent } from "@/components/FormatContent";

export default function CrewPage() {
    const { id } = useParams();
    const [crew, setCrew] = useState<{ title: string; content: string } | null>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/crew/${id}`);
                if (!res.ok) throw new Error("크루 홍보를 찾을 수 없습니다.");
                const data = await res.json();
                setCrew(data);
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
                {crew && (
                    <>
                        <div className="my-3 flex-center text-xl mb-4">{crew.title}</div>
                        <div className="w-full md:w-3/4 lg:w-3/5 p-3 mx-auto">
                            <FormatContent content={crew.content} />
                        </div>
                    </>
                )}
            </BoardWrapper>
        </div>
    );
}
