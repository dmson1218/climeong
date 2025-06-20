import BoardWrapper from "@/components/Board/BoardWrapper";

export default function TshirtPage() {
  return (
    <div className="mt-20 grid min-h-[calc(100vh-5rem-60px)] px-4">
      <BoardWrapper>
        <div className="flex-center my-3 mb-4 text-xl">티셔츠 정보</div>
        <div className="flex-center grow flex-wrap gap-1"></div>
      </BoardWrapper>
    </div>
  );
}
