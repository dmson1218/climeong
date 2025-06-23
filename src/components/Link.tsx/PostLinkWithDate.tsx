import useSkeleton from "@/hooks/useSkeleton";
import Link from "next/link";

interface PostLinkWithDateProps {
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
  boardType,
  _id,
  title,
  content,
  createdAt,
  isLoading,
}: PostLinkWithDateProps) => {
  return useSkeleton(
    isLoading,
    <Link
      key={_id}
      href={`/${boardType}/${_id}`}
      className="mx-auto flex h-24 w-full flex-col rounded border-y p-3 hover:bg-slate-100 md:w-3/4 lg:w-3/5"
    >
      <div className="flex h-6 items-center justify-between">
        <div className="truncate text-base font-medium">{title}</div>
        <div className="text-xs text-gray-500">
          {formatRelativeTimeUTC(createdAt)}
        </div>
      </div>
      {content && (
        <div className="mt-1 line-clamp-2 text-sm text-gray-600">{content}</div>
      )}
    </Link>,
  );
};

export default PostLinkWithDate;
