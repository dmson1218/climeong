import renderSkeleton from "@/utils/renderSkeleton";

interface FormatContentProps {
  isLoading: boolean;
  content: string;
}

const FormatContent: React.FC<FormatContentProps> = ({
  isLoading,
  content,
}) => {
  const formattedContent = content.split("\n").map((line, index) => {
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });

  return renderSkeleton(
    isLoading,
    <div className="prose mx-auto size-full max-w-none break-words">
      {formattedContent}
    </div>,
  );
};

export { FormatContent };
