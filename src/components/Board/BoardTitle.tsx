"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BoardTitleProps {
  boardType?: string;
  title: string;
  subTitle?: string;
}

const BoardTitle = ({ boardType, title, subTitle = "" }: BoardTitleProps) => {
  return (
    <div className="layout flex h-14 items-center px-4 md:px-12">
      <div className="flex grow flex-col justify-start">
        <div className="flex grow">
          {boardType ? (
            <Link
              href={`/${boardType}`}
              className="text-xl font-semibold hover:opacity-50"
            >
              {title}
            </Link>
          ) : (
            <span className="text-xl font-semibold">{title}</span>
          )}
        </div>
        {subTitle && (
          <div className="mt-0.5 grow text-sm font-normal">{subTitle}</div>
        )}
      </div>
      {boardType && (
        <>
          <div className="flex">
            <Link
              href={`/${boardType || ""}`}
              aria-label="더보기"
              className="hidden text-blue-600 hover:opacity-50 md:block"
            >
              더보기
            </Link>
          </div>
          <Link
            href={`/${boardType || ""}`}
            aria-label="더보기"
            className="block h-8 w-6 overflow-hidden rounded-2xl md:hidden"
          >
            <ChevronRight className="h-8 w-8" />
          </Link>
        </>
      )}
    </div>
  );
};

export default BoardTitle;
