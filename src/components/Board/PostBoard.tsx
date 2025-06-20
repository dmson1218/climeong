"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BoardWrapper from "@/components/Board/BoardWrapper";
import { FormatContent } from "@/components/FormatContent";
import useSkeleton from "@/hooks/useSkeleton";

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
                const res = await fetch(`/api/${boardType}/${id}`);
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
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 flex px-4">
            <BoardWrapper>
                {useSkeleton(
                    isLoading,
                    <div className="w-80 h-12 mx-auto my-3 flex-center text-xl mb-4">
                        {post.title}
                    </div>
                )}
                {useSkeleton(
                    isLoading,
                    <div className="w-full md:w-3/4 lg:w-3/5 grow p-3 mx-auto">
                        <FormatContent content={post.content} />
                    </div>
                )}
            </BoardWrapper>
        </div>
    );
};

export default PostBoard;
