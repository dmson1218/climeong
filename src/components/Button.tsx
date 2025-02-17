"use client";

import { useState } from "react";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    title: string;
    link?: string;
    subItems?: string[];
    subItemLinks?: string[];
}

const Button: React.FC<ButtonProps> = ({ title, link, subItems, subItemLinks }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasSubItems = subItems && subItems.length > 0;

    return (
        <div className="relative" onMouseLeave={() => setIsHovered(false)}>
            <div className="m-1.5 text-lg" onMouseEnter={() => setIsHovered(true)}>
                <Link href={link || "#"}>{title}</Link>
            </div>
            {hasSubItems && (
                <div
                    className={`absolute top-10 w-32 p-4 rounded-xl bg-slate-100
                        text-base flex flex-col gap-3 z-20
                        transition-all duration-300 ease-out
                        ${
                            isHovered
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-5 pointer-events-none"
                        }
                        `}
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

export type { ButtonProps };
export { Button };
