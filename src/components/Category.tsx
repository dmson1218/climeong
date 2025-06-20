import type { Category } from "@/types/category";
import Button from "./Button";

const categories: Category[] = [
  { title: "최신 소식", link: "/news" },
  {
    title: "장비 정보",
    subItems: ["암벽화", "초크", "티셔츠"],
    subItemLinks: ["/shoe", "/chalk", "/tshirt"],
  },
  { title: "커뮤니티", link: "/community" },
  { title: "크루 홍보", link: "/crew" },
];

const Category: React.FC = () => {
  return (
    <div className="hidden items-center justify-center gap-10 text-lg lg:flex">
      {categories.map((category: Category) => (
        <Button key={category.title} {...category} />
      ))}
    </div>
  );
};

export { categories, Category };
