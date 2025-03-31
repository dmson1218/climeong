"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Post } from "@/types/post";

const ShoesBoard = () => {
    return (
        <BoardWrapper>
            <div className="h-full flex-center">
                <Image src="/images/MadRock_Drifter.jpg" alt="event" width={300} height={200} />
            </div>
        </BoardWrapper>
    );
};

const NewsBoard = ({ count }: { count: number }) => {
    const [newsList, setNewsList] = useState<Post[]>([]);

    useEffect(() => {
        fetch(`/api/news?count=${count}`)
            .then((res) => res.json())
            .then((data) => {
                setNewsList(data);
            });
    }, [count]);

    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">최신 소식</div>
            <div className="flex flex-col gap-1">
                {newsList.length > 0 &&
                    newsList.map((news) => (
                        <Link
                            key={news._id}
                            href={`/news/${news._id}`}
                            className="mx-auto flex-center"
                        >
                            {news.title}
                        </Link>
                    ))}
            </div>
        </BoardWrapper>
    );
};

const CommunityBoard = ({ count }: { count: number }) => {
    const [newsList, setNewsList] = useState<Post[]>([]);

    useEffect(() => {
        fetch(`/api/community?count=${count}`)
            .then((res) => res.json())
            .then((data) => {
                setNewsList(data);
            });
    }, [count]);

    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">커뮤니티</div>
            <div className="flex flex-col gap-1">
                {newsList.length > 0 &&
                    newsList.map((news) => (
                        <Link
                            key={news._id}
                            href={`/news/${news._id}`}
                            className="mx-auto flex-center"
                        >
                            {news.title}
                        </Link>
                    ))}
            </div>
        </BoardWrapper>
    );
};

const CrewBoard = ({ count }: { count: number }) => {
    const [newsList, setNewsList] = useState<Post[]>([]);

    useEffect(() => {
        fetch(`/api/crew?count=${count}`)
            .then((res) => res.json())
            .then((data) => {
                setNewsList(data);
            });
    }, [count]);

    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">크루 홍보</div>
            <div className="flex flex-col gap-1">
                {newsList.length > 0 &&
                    newsList.map((news) => (
                        <Link
                            key={news._id}
                            href={`/news/${news._id}`}
                            className="mx-auto flex-center"
                        >
                            {news.title}
                        </Link>
                    ))}
            </div>
        </BoardWrapper>
    );
};

const MainBoard = () => {
    return (
        <div className="min-h-[calc(100vh-5rem-60px)] px-4 mt-20 grid sm:grid-rows-3 bg-white">
            <div className="sm:row-span-2 grid grid-cols-1">
                <ShoesBoard />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
                <NewsBoard count={4} />
                <CommunityBoard count={4} />
                <CrewBoard count={4} />
            </div>
        </div>
    );
};

const BoardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grow px-6 py-4 m-2 rounded border-2 border-slate-300 flex flex-col">
            {children}
        </div>
    );
};

export { MainBoard, BoardWrapper };
