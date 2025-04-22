import BoardWrapper from "@/components/Board/BoardWrapper";

export default function TshirtPage() {
    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">티셔츠 정보</div>
                <div className="grow flex-center flex-wrap gap-1"></div>
            </BoardWrapper>
        </div>
    );
}
