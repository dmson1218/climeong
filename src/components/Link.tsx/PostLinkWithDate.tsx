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
            className="w-full md:w-3/4 lg:w-3/5 h-12 mx-auto flex justify-between p-3 rounded hover:bg-slate-100"
        >
            <div>{title}</div>
            <div>{new Date(createdAt).toLocaleDateString()}</div>
        </Link>
    );
};

export default PostLinkWithDate;
