const BoardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="m-4 flex grow flex-col md:mx-12">{children}</div>;
};

export default BoardWrapper;
