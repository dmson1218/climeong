"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { News } from "../app/api/news/route";

interface NewsBoardProps {
    count: number;
}

const NewsBoard: React.FC<NewsBoardProps> = ({ count }) => {
    const [newsList, setNewsList] = useState<News[]>([]);

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

const MainBoard = () => {
    return (
        <div className="min-h-[calc(100vh-5rem-60px)] px-4 mt-20 grid sm:grid-rows-3 bg-white">
            <div className="sm:row-span-2 grid grid-cols-1 sm:grid-cols-2">
                <EventBoard />
                <MonthlyBoard />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
                <PopularBoard />
                <NewsBoard count={4} />
                <RankingBoard />
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

const PopularBoard = () => {
    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">인기 글</div>
            <div className="flex flex-col gap-1">
                <div className="flex-center">1. 첫 번째 글</div>
                <div className="flex-center">2. 두 번째 글</div>
                <div className="flex-center">3. 세 번째 글</div>
                <div className="flex-center">4. 네 번째 글</div>
            </div>
        </BoardWrapper>
    );
};

const RankingBoard = () => {
    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">검색어 랭킹</div>
            <div className="flex flex-col gap-1">
                <div className="flex-center">1. 첫 번째 글</div>
                <div className="flex-center">2. 두 번째 글</div>
                <div className="flex-center">3. 세 번째 글</div>
                <div className="flex-center">4. 네 번째 글</div>
            </div>
        </BoardWrapper>
    );
};

const EventBoard = () => {
    return (
        <BoardWrapper>
            <div className="h-full flex-center">
                <Image src="/images/theclimb.png" alt="event" width={300} height={200} />
            </div>
        </BoardWrapper>
    );
};

const MonthlyBoard = () => {
    return (
        <BoardWrapper>
            <div className="sm:my-3 flex-center text-xl mb-3 sm:mb-4">이달의 클라이머</div>
            <div className="flex flex-col gap-1">
                <div className="flex-center">1. 첫 번째 글</div>
                <div className="flex-center">2. 두 번째 글</div>
                <div className="flex-center">3. 세 번째 글</div>
                <div className="flex-center">4. 네 번째 글</div>
            </div>
        </BoardWrapper>
    );
};

export { MainBoard, BoardWrapper, NewsBoard };
