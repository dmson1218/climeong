import Button from "./Button";

const CategoryTitles: string[] = ["최신 소식", "장비 정보", "커뮤니티", "크루 홍보"];

const Category: React.FC = () => {
    return (
        <div className="w-full flex-center border-b border-gray-300 text-lg">
            {CategoryTitles.map((title) => (
                <Button key={title} title={title} />
            ))}
        </div>
    );
};

export default Category;
