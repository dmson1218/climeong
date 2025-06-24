"use client";

import { Category } from "@/components/Category";
import MenuBar from "@/components/Menu/MenuBar";
import MenuButton from "@/components/Menu/MenuButton";
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
      <div className="fixed left-0 top-0 z-20 h-20 w-full border-b border-gray-200 bg-white">
        <div className="layout mt-5 flex justify-between">
          <div className="flex w-48 justify-start px-8 md:px-12">
            <Link
              href="/"
              className="cursor-pointer pt-1 font-reko text-2xl font-medium"
            >
              클라이멍
            </Link>
          </div>
          <Category />
          <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <MenuBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
