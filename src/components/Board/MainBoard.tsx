import ShoesBoard from "@/components/Board/ShoesBoard";
import Board from "@/components/Board/Board";

const MainBoard = () => {
    return (
        <div className="min-h-[calc(100vh-5rem-60px)] px-4 mt-20 grid sm:grid-rows-3 bg-white">
            <div className="sm:row-span-2 grid grid-cols-1">
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
