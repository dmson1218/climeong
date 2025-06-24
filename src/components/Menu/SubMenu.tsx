import Link from "next/link";

interface SubMenuProps {
  active: boolean;
  subItems: string[];
  subItemLinks: string[];
  setIsOpen: (v: boolean) => void;
}

const SubMenu = ({
  active,
  subItems,
  subItemLinks,
  setIsOpen,
}: SubMenuProps) => {
  return (
    <div
      className={`flex flex-col overflow-hidden duration-700 ease-in-out lg:invisible ${
        active ? "max-h-60" : "max-h-0 opacity-0"
      }`}
    >
      {subItems.map((subItem, i) => (
        <Link
          key={subItem}
          href={subItemLinks[i] || "#"}
          className="cursor-pointer px-12 py-3 text-black hover:text-gray-400 md:px-16 lg:invisible"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div className="pt-1">{subItem}</div>
        </Link>
      ))}
    </div>
  );
};

export default SubMenu;
