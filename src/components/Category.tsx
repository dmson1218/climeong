import Button from "./Button";

const CategoryTitles: string[] = ["클라이밍 뉴스", "장비 정보", "커뮤니티", "크루 홍보"];

const Category: React.FC = () => {
    return (
        <div className="w-full flex-center grow border-b border-gray-300">
            {CategoryTitles.map((title) => (
                <Button key={title} title={title} />
            ))}
        </div>
    );
};

export default Category;
