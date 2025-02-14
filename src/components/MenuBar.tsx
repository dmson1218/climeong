"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CategoryTitles } from "./Category";

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [animate, setAnimate] = useState(false); // 애니메이션 상태

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            requestAnimationFrame(() => setAnimate(true)); // 더 자연스러운 애니메이션
        } else {
            setAnimate(false);
            setTimeout(() => setShouldRender(false), 300); // 애니메이션 후 제거
        }
    }, [isOpen]);

    return (
        <div className="visible lg:invisible w-32 mr-4 flex items-center justify-end">
            <Image
                src="/icons/menu.png"
                alt="menu"
                width={24}
                height={24}
                className="mr-6 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            />
            {shouldRender && (
                <div
                    className={`w-full absolute top-20 right-0 bg-white shadow-lg rounded-lg transition-all duration-300 transform ${
                        animate ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
                    }`}
                >
                    <ul className="h-[calc(100vh-5rem)] pt-4 space-y-2">
                        {CategoryTitles.map((title) => (
                            <li
                                key={title}
                                className="pl-10 py-4 rounded text-lg font-medium hover:bg-gray-100 cursor-pointer"
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MenuBar;
