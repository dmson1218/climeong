import BoardTitle from "@/components/Board/BoardTitle";
import PreviewBoard from "@/components/Board/PreviewBoard";
import ShoesBoard from "@/components/Board/ShoesBoard";
import SNSBoard from "./SNSBoard";

const MainBoard = () => {
  return (
    <div className="layout mt-24 min-h-[calc(100vh-6rem-60px)] bg-white">
      <SNSBoard />
      <br />
      <BoardTitle
        boardType="shoe"
        title="새로운 암벽화 찾고 계신가요?"
        subTitle="좋아하실 만한 암벽화를 추천해 드려요."
      />
      <ShoesBoard />
      <br />
      <BoardTitle boardType="news" title="최신 소식을 확인해 보세요😎" />
      <PreviewBoard boardType="news" />
    </div>
  );
};

export default MainBoard;
