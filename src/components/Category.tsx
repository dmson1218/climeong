import { ButtonProps, Button } from "./Button";

const categories: ButtonProps[] = [
    { title: "최신 소식", link: "/news" },
    {
        title: "장비 정보",
        subItems: ["암벽화", "초크", "티셔츠"],
        subItemLinks: ["/shoes", "/chalk", "/tshirt"],
    },
    { title: "커뮤니티", link: "/community" },
    { title: "크루 홍보", link: "/crew" },
];

const Category: React.FC = () => {
    return (
        <div className="hidden lg:flex items-center justify-center text-lg gap-10">
            {categories.map((category: ButtonProps) => (
                <Button key={category.title} {...category} />
            ))}
        </div>
    );
};

export { categories, Category };
