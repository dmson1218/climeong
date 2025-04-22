import Link from "next/link";
import renderSkeleton from "@/util/renderSkeleton";

interface PostLinkProps {
    boardType: string;
    _id: string;
    title: string;
    isLoading: boolean;
}

const PostLink = ({ boardType, _id, title, isLoading }: PostLinkProps) => {
    return renderSkeleton(
        isLoading,
        <Link key={_id} href={`/${boardType}/${_id}`} className="w-full h-6 mx-auto flex-center">
            {title}
        </Link>
    );
};

export default PostLink;
