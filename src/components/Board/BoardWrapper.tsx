const BoardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="mx-8 my-4 flex grow flex-col rounded border border-gray-200 sm:mx-12">
      {children}
    </div>
  );
};

export default BoardWrapper;
