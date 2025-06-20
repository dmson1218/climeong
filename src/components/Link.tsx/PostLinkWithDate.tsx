import useSkeleton from "@/hooks/useSkeleton";
import Link from "next/link";

interface PostLinkWithDateProps {
  boardType: string;
  _id: string;
  title: string;
  createdAt: Date;
  isLoading: boolean;
}

const PostLinkWithDate = ({
  boardType,
  _id,
  title,
  createdAt,
  isLoading,
}: PostLinkWithDateProps) => {
  return useSkeleton(
    isLoading,
    <Link
      key={_id}
      href={`/${boardType}/${_id}`}
      className="mx-auto flex h-12 w-full justify-between rounded p-3 hover:bg-slate-100 md:w-3/4 lg:w-3/5"
    >
      <div>{title}</div>
      <div>{new Date(createdAt).toLocaleDateString()}</div>
    </Link>,
  );
};

export default PostLinkWithDate;
