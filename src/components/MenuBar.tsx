"use client";

import { useState } from "react";
import Image from "next/image";
import { CategoryTitles } from "./Category";

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="visible lg:invisible w-32 mr-2 flex items-center justify-end">
            <Image
                src={isOpen ? "/icons/close.png" : "/icons/menu.png"}
                alt="menu"
                width={22}
                height={22}
                className="pb-2 mr-6 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            />
            {/* isOpen에 의한 렌더링 제어 */}
            <div
                className={`w-full absolute top-20 right-0 bg-white shadow-lg rounded-lg transition-all duration-300 transform ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
                }`}
            >
                <ul className="h-[calc(100vh-5rem)] pt-4 space-y-2">
                    {CategoryTitles.map((title) => (
                        <li
                            key={title}
                            className="pl-10 py-5 rounded text-lg hover:bg-gray-100 cursor-pointer"
                        >
                            {title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuBar;
