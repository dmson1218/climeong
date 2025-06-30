import useSkeleton from "@/utils/renderSkeleton";
import Link from "next/link";

interface PostLinkProps {
  boardType: string;
  _id: string;
  title: string;
  isLoading: boolean;
}

const PostLink = ({ boardType, _id, title, isLoading }: PostLinkProps) => {
  return useSkeleton(
    isLoading,
    <Link
      href={`/${boardType}/${_id}`}
      className="flex-center mx-auto h-6 w-full"
    >
      {title}
    </Link>,
  );
};

export default PostLink;
