import Link from "next/link";
import { useState } from "react";
import type { MenuStateProps } from "../Header";
import SubMenu from "./SubMenu";

interface MenuItemProps extends Pick<MenuStateProps, "setIsOpen"> {
  item: {
    title: string;
    link?: string;
    subItems?: string[];
    subItemLinks?: string[];
  };
}

const MenuItem = ({ item, setIsOpen }: MenuItemProps) => {
  const [active, setActive] = useState(false);
  const toggle = () => setActive((prev) => !prev);

  const { title, link, subItems, subItemLinks } = item;

  return (
    <li className="relative text-black">
      {subItems && subItemLinks ? (
        <>
          <div
            className="block cursor-pointer p-5 pl-10 hover:text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            <div className="pt-1.5 text-lg">{title}</div>
          </div>
          <SubMenu
            active={active}
            subItems={subItems}
            subItemLinks={subItemLinks}
            setIsOpen={setIsOpen}
          />
        </>
      ) : (
        <Link
          href={link || "#"}
          className="block p-5 pl-10 text-black hover:text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div className="pt-1.5 text-lg">{title}</div>
        </Link>
      )}
    </li>
  );
};

export default MenuItem;
