import BoardWrapper from "@/components/Board/BoardWrapper";

export default function ChalkPage() {
  return (
    <div className="mt-24 grid min-h-[calc(100vh-6rem-60px)] px-4 lg:px-10">
      <BoardWrapper>
        <div className="flex-center my-3 mb-4 text-xl">초크 정보</div>
        <div className="flex-center grow flex-wrap gap-1"></div>
      </BoardWrapper>
    </div>
  );
}
