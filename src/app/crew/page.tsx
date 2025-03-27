"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Crew } from "../api/crew/route";
import { BoardWrapper } from "@/components/MainBoard";

export default function CrewPage() {
    const [crewList, setCrewList] = useState<Crew[]>([]);
    const [postsToShow, setPostsToShow] = useState<number>(10);

    const updatePostsToShow = () => {
        const height = window.innerHeight;
        if (height >= 800) {
            setPostsToShow(10);
        } else if (height >= 600) {
            setPostsToShow(7);
        } else {
            setPostsToShow(5);
        }
    };

    useEffect(() => {
        fetch("/api/crew?count=10")
            .then((res) => res.json())
            .then((data) => {
                setCrewList(data);
            });

        updatePostsToShow();
        window.addEventListener("resize", updatePostsToShow);

        return () => {
            window.removeEventListener("resize", updatePostsToShow);
        };
    }, []);

    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">크루 홍보</div>
                <div className="grow flex flex-col items-center gap-1">
                    {crewList.slice(0, postsToShow).map((crew) => (
                        <Link
                            key={crew._id}
                            href={`/crew/${crew._id}`}
                            className="w-full md:w-3/4 lg:w-3/5 mx-auto flex justify-between p-3 rounded hover:bg-slate-100"
                        >
                            <div>{crew.title}</div>
                            <div>{new Date(crew.createdAt).toLocaleDateString()}</div>
                        </Link>
                    ))}
                </div>
                <div className="w-full md:w-3/4 lg:w-3/5 mx-auto p-3 flex justify-end">
                    <Link href="/crew/create">글쓰기</Link>
                </div>
            </BoardWrapper>
        </div>
    );
}
