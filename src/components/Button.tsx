interface ButtonProps {
    title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
    return (
        <button className="grow p-1.5 hover:bg-gray-200 border border-slate-300">{title}</button>
    );
};

export default Button;
