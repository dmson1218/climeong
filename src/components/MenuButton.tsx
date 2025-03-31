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
        <div className="lg:invisible w-32 mx-2 flex items-center justify-end">
            <Image
                src={isOpen ? "/icons/close.png" : "/icons/menu.png"}
                alt="menu"
                width={22}
                height={22}
                className="pb-2 mr-6 cursor-pointer"
                onClick={handleClick}
            />
        </div>
    );
};

export default MenuButton;
