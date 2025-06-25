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
    <div className="layout flex h-14 items-center px-8 md:px-12">
      <div className="flex grow flex-col justify-start">
        <div className="flex grow">
          <Link
            href={`/${boardType || ""}`}
            className="text-xl font-semibold hover:opacity-50"
          >
            {title}
          </Link>
        </div>
        {subTitle && (
          <div className="mt-0.5 grow text-sm font-normal">{subTitle}</div>
        )}
      </div>
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
        className="overflow-hidden rounded-2xl"
      >
        <ChevronRight className="block h-8 w-8 md:hidden" />
      </Link>
    </div>
  );
};

export default BoardTitle;
