"use client";

import { useState } from "react";

interface ButtonProps {
    title: string;
    subItems?: string[];
}

const Button: React.FC<ButtonProps> = ({ title, subItems }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasSubItems = subItems && subItems.length > 0;

    return (
        <div className="relative" onMouseLeave={() => setIsHovered(false)}>
            <button className="p-1.5 text-lg" onMouseEnter={() => setIsHovered(true)}>
                {title}
            </button>
            {hasSubItems && (
                <div
                    className={`absolute top-10 left-0 w-32 p-4 rounded-xl bg-slate-100
                        text-base flex flex-col gap-3 z-20
                        transition-all duration-300 ease-out
                        ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
                        `}
                >
                    {subItems.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Button;
