"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuStateProps } from "./Header";

const MenuButton: React.FC<MenuStateProps> = ({ isOpen, setIsOpen }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    if (isButtonDisabled) return;

    setIsOpen((prev) => !prev);
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 580);
  };

  return (
    <div className="mx-2 flex w-32 items-center justify-end lg:invisible">
      <Image
        src={isOpen ? "/icons/close.png" : "/icons/menu.png"}
        alt="menu"
        width={22}
        height={22}
        priority
        className="mr-6 cursor-pointer pb-2"
        onClick={handleClick}
      />
    </div>
  );
};

export default MenuButton;
