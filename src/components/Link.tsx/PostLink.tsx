import useSkeleton from "@/hooks/useSkeleton";
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
        <Link href={`/${boardType}/${_id}`} className="w-full h-6 mx-auto flex-center">
            {title}
        </Link>
    );
};

export default PostLink;
