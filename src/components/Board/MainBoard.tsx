import BoardTitle from "@/components/Board/BoardTitle";
import ShoesBoard from "@/components/Board/ShoesBoard";

const MainBoard = () => {
  return (
    <div className="layout mt-24 min-h-[calc(100vh-6rem-60px)] bg-white">
      <BoardTitle
        boardType="shoe"
        title="이런 암벽화 찾고 있나요?"
        subTitle="좋아하실 만한 암벽화를 추천해 드려요."
      />
      <ShoesBoard />
      <BoardTitle title="최신 게시글을 확인해 보세요😎" />
    </div>
  );
};

export default MainBoard;
