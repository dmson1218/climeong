"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HeaderProps } from "./Header";
import { categories } from "./Category";

const MenuBar: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const toggleSubMenu = (title: string) => {
        setActiveCategory((prev) => (prev === title ? null : title));
    };

    useEffect(() => {
        if (isOpen) {
            setShowMenu(true);
            setTimeout(() => {
                setOpacity(1);
            }, 80);
        } else {
            setOpacity(0);
            setTimeout(() => {
                setShowMenu(false);
            }, 500);
        }
    }, [isOpen]);

    if (!showMenu) return null;

    return (
        <div
            className="inset-0 fixed lg:invisible top-20 left-0 bg-white transition-opacity duration-500 ease-in-out"
            style={{ opacity }}
        >
            <ul className="pt-5 bg-white">
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
                        {subItems && subItemLinks && activeCategory === title && (
                            <div className="overflow-hidden flex flex-col">
                                {subItems.map((subItem, index) => (
                                    <Link
                                        key={subItem}
                                        href={subItemLinks[index] || "#"}
                                        className="px-14 py-3 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setIsOpen(false)}
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
    );
};

export default MenuBar;
