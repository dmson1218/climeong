"use client";

import Link from "next/link";
import { useState } from "react";
import { Category } from "@/components/Category";
import MenuBar from "@/components/MenuBar";
import MenuButton from "@/components/MenuButton";

export interface HeaderProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="w-full h-20 pt-3 fixed top-0 left-0 flex justify-between bg-white z-10">
                <div className="w-32 ml-4 flex-center">
                    <Link href="/" className="text-2xl cursor-pointer">
                        클라이멍
                    </Link>
                </div>
                <Category />
                <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <MenuBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default Header;
