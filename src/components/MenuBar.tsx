"use client";

import { useState } from "react";
import Link from "next/link";
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
                <ul className="h-[calc(100vh-5rem)] pt-5">
                    {categories.map(({ title, link, subItems, subItemLinks }) => (
                        <li
                            key={title}
                            className="hover:bg-gray-100 cursor-pointer relative"
                            onClick={() => toggleSubMenu(title)}
                        >
                            <Link
                                href={link || "#"}
                                className="pl-10 p-5 block"
                                onClick={() => {
                                    if (!subItems) {
                                        setIsOpen(false);
                                    }
                                }}
                            >
                                <div className="pt-1.5 text-lg">{title}</div>
                            </Link>
                            {subItems && subItemLinks && (
                                <div
                                    className={`overflow-hidden flex flex-col
                                        transition-all duration-500 ease-in-out ${
                                            activeCategory === title
                                                ? "max-h-60 opacity-100 transform translate-y-0"
                                                : "max-h-0 opacity-0 transform -translate-y-2"
                                        }`}
                                >
                                    {subItems.map((subItem, index) => (
                                        <Link
                                            key={subItem}
                                            href={subItemLinks[index] || "#"}
                                            className="px-14 py-3 hover:bg-gray-200 cursor-pointer"
                                            onClick={toggleMenu}
                                        >
                                            <div className="pt-1">{subItem}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MenuBar;
