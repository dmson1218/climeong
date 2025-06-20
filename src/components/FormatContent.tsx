interface FormatContentProps {
  content: string;
}

const FormatContent: React.FC<FormatContentProps> = ({ content }) => {
  const formattedContent = content.split("\n").map((line, index) => {
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });

  return <>{formattedContent}</>;
};

export { FormatContent };
