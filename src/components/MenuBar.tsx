"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "./Category";
import type { MenuStateProps } from "./Header";

const MenuBar: React.FC<MenuStateProps> = ({ isOpen, setIsOpen }) => {
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
      className="fixed inset-0 left-0 top-20 z-10 bg-white transition-opacity duration-500 ease-in-out lg:invisible"
      style={{ opacity }}
    >
      <ul className="bg-white pt-5">
        {categories.map(({ title, link, subItems, subItemLinks }) => (
          <li
            key={title}
            className="relative cursor-pointer hover:bg-gray-100"
            onClick={() => toggleSubMenu(title)}
          >
            {subItems && subItemLinks ? (
              <>
                <div
                  className="block p-5 pl-10"
                  onClick={() => {
                    if (!subItems) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <div className="pt-1.5 text-lg">{title}</div>
                </div>
                <div
                  className={`flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
                    activeCategory === title ? "max-h-60" : "max-h-0"
                  }`}
                >
                  {subItems.map((subItem, index) => (
                    <Link
                      key={subItem}
                      href={subItemLinks[index] || "#"}
                      className="cursor-pointer px-14 py-3 hover:bg-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="pt-1">{subItem}</div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                href={link || "#"}
                className="block p-5 pl-10"
                onClick={() => {
                  if (!subItems) {
                    setIsOpen(false);
                  }
                }}
              >
                <div className="pt-1.5 text-lg">{title}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
