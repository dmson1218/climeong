"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CategoryTitles } from "./Category";

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMenu = () => {
        setIsAnimating(true);
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!isOpen) {
            setIsAnimating(false);
        }
    }, [isOpen]);

    return (
        <div className="visible lg:invisible w-32 mx-2 flex items-center justify-end">
            <Image
                src={isOpen ? "/icons/close.png" : "/icons/menu.png"}
                alt="menu"
                width={22}
                height={22}
                className="pb-2 mr-6 cursor-pointer"
                onClick={toggleMenu}
            />
            <div
                className={`absolute lg:hidden w-full top-20 right-0 bg-white shadow-lg rounded-lg transition-all duration-300 transform ${
                    isOpen ? "translate-y-0 opacity-100 z-20" : "-translate-y-5 opacity-0 z-10"
                } ${isAnimating ? "z-20" : "z-0"}`}
            >
                <ul className="h-[calc(100vh-5rem)] pt-8 space-y-2">
                    {CategoryTitles.map((title) => (
                        <li
                            key={title}
                            className="pl-10 py-5 rounded hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="pt-1.5 text-lg">{title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuBar;
