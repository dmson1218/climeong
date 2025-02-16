"use client";

import { useState } from "react";
import Image from "next/image";
import { categories } from "./Category";

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const toggleSubMenu = (title: string) => {
        setActiveCategory((prev) => (prev === title ? null : title));
    };

    return (
        <>
            <div className="visible lg:invisible w-32 mx-2 flex items-center justify-end">
                <Image
                    src={isOpen ? "/icons/close.png" : "/icons/menu.png"}
                    alt="menu"
                    width={22}
                    height={22}
                    className="pb-2 mr-6 cursor-pointer"
                    onClick={toggleMenu}
                />
            </div>
            <div
                className={`absolute lg:hidden w-full top-20 right-0 bg-white transition-all duration-500 transform ${
                    isOpen ? "translate-y-0 opacity-100 z-20" : "-translate-y-5 opacity-0 z-10"
                }`}
            >
                <ul className="h-[calc(100vh-5rem)] pt-4 space-y-4">
                    {categories.map(({ title, subItems }) => (
                        <li
                            key={title}
                            className="py-5 hover:bg-gray-100 cursor-pointer relative"
                            onClick={() => toggleSubMenu(title)}
                        >
                            <div className="pl-10 pt-1.5 text-lg">{title}</div>
                            {subItems && (
                                <ul
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                        activeCategory === title
                                            ? "mt-5 max-h-60 opacity-100 transform translate-y-0"
                                            : "max-h-0 opacity-0 transform -translate-y-2"
                                    }`}
                                >
                                    {subItems.map((subItem) => (
                                        <li
                                            key={subItem}
                                            className="px-14 py-3 hover:bg-gray-200 pt-4 cursor-pointer"
                                        >
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MenuBar;
