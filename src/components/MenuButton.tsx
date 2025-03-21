"use client";

import Image from "next/image";
import { HeaderProps } from "./Header";

const MenuButton: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className="visible lg:invisible w-32 mx-2 flex items-center justify-end">
            <Image
                src={isOpen ? "/icons/close.png" : "/icons/menu.png"}
                alt="menu"
                width={22}
                height={22}
                className="pb-2 mr-6 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            />
        </div>
    );
};

export default MenuButton;
