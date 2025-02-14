import Button from "./Button";

const CategoryTitles: string[] = ["최신 소식", "장비 정보", "커뮤니티", "크루 홍보"];

const Category: React.FC = () => {
    return (
        <div className="hidden lg:flex items-center justify-center text-lg gap-10">
            {CategoryTitles.map((title) => (
                <Button key={title} title={title} />
            ))}
        </div>
    );
};

export default Category;
