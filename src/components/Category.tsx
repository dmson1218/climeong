import Button from "./Button";

interface CategoryProps {
    titles: string[];
}

const Category: React.FC<CategoryProps> = ({ titles }) => {
    return (
        <div className="w-full flex-center grow border-b border-gray-300">
            {titles.map((title) => (
                <Button key={title} title={title} />
            ))}
        </div>
    );
};

export default Category;
