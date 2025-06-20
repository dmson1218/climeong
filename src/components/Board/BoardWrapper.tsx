const BoardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="m-2 flex grow flex-col rounded border-2 border-slate-300 px-6 py-4">
      {children}
    </div>
  );
};

export default BoardWrapper;
