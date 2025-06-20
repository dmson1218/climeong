"use client";

import { Category } from "@/components/Category";
import MenuBar from "@/components/MenuBar";
import MenuButton from "@/components/MenuButton";
import Link from "next/link";
import { useState } from "react";

export interface MenuStateProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex h-20 w-full justify-between bg-white pt-3">
        <div className="flex-center ml-4 w-32">
          <Link href="/" className="cursor-pointer text-2xl">
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
