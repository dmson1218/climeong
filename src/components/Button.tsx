"use client";

import { useState, useEffect } from "react";

interface ButtonProps {
    title: string;
    subItems?: string[]; // 하위 정보 (선택적)
}

const Button: React.FC<ButtonProps> = ({ title, subItems }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const hasSubItems = subItems && subItems.length > 0; // 하위 정보 있는지 체크

    const handleMouseEnter = () => {
        if (!hasSubItems) return; // 하위 정보 없으면 이벤트 X
        setIsHovered(true);
        setTimeout(() => setIsVisible(true), 0);
    };

    const handleMouseLeave = () => {
        if (!hasSubItems) return;
        setIsHovered(false);
    };

    useEffect(() => {
        if (!isHovered) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isHovered]);

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <button className="p-1.5 text-lg" onMouseEnter={handleMouseEnter}>
                {title}
            </button>
            {hasSubItems && (
                <div
                    className={`absolute top-10 left-0 w-32 p-4 rounded-xl bg-slate-100 text-base flex flex-col gap-3
                        transition-all duration-300 ease-out
                        ${
                            isHovered
                                ? "opacity-100 translate-y-0 z-20"
                                : "opacity-0 -translate-y-5 z-10"
                        }
                        ${isVisible ? "max-h-screen" : "max-h-0"}`}
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
