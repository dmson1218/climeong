import Button from "./Button";

const categories = [
    { title: "최신 소식" },
    { title: "장비 정보", subItems: ["암벽화", "하네스", "로프", "카라비너"] },
    { title: "커뮤니티" },
    { title: "크루 홍보" },
];

const Category: React.FC = () => {
    return (
        <div className="hidden lg:flex items-center justify-center text-lg gap-10">
            {categories.map(({ title, subItems }) => (
                <Button key={title} title={title} subItems={subItems} />
            ))}
        </div>
    );
};

export { categories, Category };
