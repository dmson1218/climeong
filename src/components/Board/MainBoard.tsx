import BoardTitle from "@/components/Board/BoardTitle";
import PreviewBoard from "@/components/Board/PreviewBoard";
import ShoesBoard from "@/components/Board/ShoesBoard";
import BrandBoard from "./BrandBoard";
import SNSBoard from "./SNSBoard";

const MainBoard = () => {
  return (
    <div className="layout mt-20 min-h-[calc(100vh-8rem)] bg-white md:mt-24 md:min-h-[calc(100vh-9rem)]">
      <BoardTitle title="이달의 클라이머를 소개합니다🤭" />
      <SNSBoard />
      <br />
      <BoardTitle
        boardType="shoe"
        title="새로운 암벽화 찾고 계신가요?"
        subTitle="좋아하실 만한 암벽화를 추천해 드려요."
      />
      <ShoesBoard />
      <br />
      <BoardTitle title="믿고 신는 브랜드, 여기 다 있어요!" />
      <BrandBoard />
      <br />
      <BoardTitle boardType="news" title="한 발 앞서는 클라이밍 뉴스😎" />
      <PreviewBoard boardType="news" />

      <br />
    </div>
  );
};

export default MainBoard;
