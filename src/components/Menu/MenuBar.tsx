"use client";

import { useEffect, useState } from "react";
import { categories } from "../Category";
import type { MenuStateProps } from "../Header";
import MenuBarItem from "./MenuItem";

const MenuBar: React.FC<MenuStateProps> = ({ isOpen, setIsOpen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowMenu(true);
      setTimeout(() => setOpacity(1), 80);
    } else {
      setTimeout(() => setOpacity(0), 50);
      setTimeout(() => setShowMenu(false), 500);
    }
  }, [isOpen]);

  if (!showMenu) return null;

  return (
    <div
      className="fixed inset-0 left-0 top-20 z-10 bg-white transition-opacity duration-500 ease-in-out lg:invisible"
      style={{ opacity }}
    >
      <ul className="bg-white pt-5">
        {categories.map((item) => (
          <MenuBarItem key={item.title} item={item} setIsOpen={setIsOpen} />
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
