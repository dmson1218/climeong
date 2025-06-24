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
    <div className="layout flex h-16 items-center px-8 sm:px-12">
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
          className="hidden text-blue-500 hover:opacity-50 lg:block"
        >
          더보기
        </Link>
      </div>
      <Link
        href={`/${boardType || ""}`}
        className="overflow-hidden rounded-2xl"
      >
        <ChevronRight className="block h-8 w-8 lg:hidden" />
      </Link>
    </div>
  );
};

export default BoardTitle;
