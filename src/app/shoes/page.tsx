import Link from "next/link";
import { BoardWrapper } from "@/components/MainBoard";

export default function ShoesPage() {
    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">암벽화 정보</div>
                <div className="grow flex flex-col gap-1"></div>
                <div className="flex justify-end">
                    <Link href="/news/create">글쓰기</Link>
                </div>
            </BoardWrapper>
        </div>
    );
}
