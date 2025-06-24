import BoardTitle from "@/components/Board/BoardTitle";
import PreviewBoard from "@/components/Board/PreviewBoard";
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
      <br />
      <BoardTitle boardType="news" title="최신 소식을 확인해 보세요😎" />
      <PreviewBoard boardType="news" />
      <br />
      <BoardTitle
        boardType="community"
        title="클라이머 커뮤니티에 어서 오세요!"
      />
      <PreviewBoard boardType="community" />
      <br />
      <BoardTitle boardType="crew" title="함께 등반할 사람을 찾아보세요!" />
      <PreviewBoard boardType="crew" />
    </div>
  );
};

export default MainBoard;
