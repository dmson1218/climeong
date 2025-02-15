interface ButtonProps {
    title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
    return (
        <div className="relative group">
            <button className="p-1.5 text-lg">{title}</button>
            <div className="w-32 p-4 absolute hidden group-hover:flex mt-0.5 rounded-xl bg-slate-200">
                안녕하세요
            </div>
        </div>
    );
};

export default Button;
