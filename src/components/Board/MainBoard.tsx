import Board from "@/components/Board/Board";
import ShoesBoard from "@/components/Board/ShoesBoard";

const MainBoard = () => {
  return (
    <div className="layout mt-24 grid min-h-[calc(100vh-6rem-60px)] bg-white sm:grid-rows-3">
      <div className="grid grid-cols-1 sm:row-span-2">
        <ShoesBoard />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <Board boardType="news" boardTitle="최신 소식" count={4} />
        <Board boardType="community" boardTitle="커뮤니티" count={4} />
        <Board boardType="crew" boardTitle="크루 홍보" count={4} />
      </div>
    </div>
  );
};

export default MainBoard;
