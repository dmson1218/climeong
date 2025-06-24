"use client";

import type { Category } from "@/types/category";
import Link from "next/link";
import { useState } from "react";

const Button: React.FC<Category> = ({
  title,
  link,
  subItems,
  subItemLinks,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div className="relative" onMouseLeave={() => setIsHovered(false)}>
      <div
        className="m-1.5 text-lg font-semibold"
        onMouseEnter={() => setIsHovered(true)}
      >
        {hasSubItems ? (
          <div className="hover:cursor-pointer">{title}</div>
        ) : (
          <Link href={link || "#"}>{title}</Link>
        )}
      </div>
      {hasSubItems && (
        <div
          className={`absolute top-10 z-20 flex w-full flex-col gap-3 rounded-xl border bg-white p-4 text-base shadow-lg transition-all duration-300 ease-out ${
            isHovered
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-5 opacity-0"
          } `}
        >
          {subItems.map((item, index) => (
            <Link key={item} href={subItemLinks?.[index] || "#"}>
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Button;
