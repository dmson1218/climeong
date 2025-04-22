const BoardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grow px-6 py-4 m-2 rounded border-2 border-slate-300 flex flex-col">
            {children}
        </div>
    );
};

export default BoardWrapper;
