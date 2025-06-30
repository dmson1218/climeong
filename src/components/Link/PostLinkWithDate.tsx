import renderSkeleton from "@/utils/renderSkeleton";
import Link from "next/link";

interface PostLinkWithDateProps {
  ref?: React.Ref<HTMLAnchorElement>;
  boardType: string;
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  isLoading: boolean;
}

const formatRelativeTimeUTC = (dateString: string): string => {
  const now = new Date();
  const target = new Date(dateString);

  const diffMs = now.getTime() - target.getTime();
  if (diffMs < 0) return "방금 전";

  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds < 60) return "방금 전";

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}일 전`;

  const month = String(target.getUTCMonth() + 1).padStart(2, "0");
  const day = String(target.getUTCDate()).padStart(2, "0");
  return `${month}.${day}`;
};

const PostLinkWithDate = ({
  ref,
  boardType,
  _id,
  title,
  content,
  createdAt,
  isLoading,
}: PostLinkWithDateProps) => {
  return (
    <Link
      key={_id}
      ref={ref}
      href={`/${boardType}/${_id}`}
      className="mx-6 flex h-16 grow flex-col justify-between md:h-32"
    >
      {renderSkeleton(
        isLoading,
        <div className="line-clamp-1 h-6 w-11/12 text-lg font-medium">
          {title}
        </div>,
      )}
      {renderSkeleton(
        isLoading,
        <div className="hidden h-12 w-full font-normal md:line-clamp-2">
          {content}
        </div>,
      )}
      {renderSkeleton(
        isLoading,
        <div className="h-5 w-1/5 text-sm font-normal text-gray-500 md:text-base">
          {formatRelativeTimeUTC(createdAt)}
        </div>,
      )}
    </Link>
  );
};

export default PostLinkWithDate;
