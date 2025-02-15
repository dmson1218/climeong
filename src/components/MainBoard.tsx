import Image from "next/image";

const MainBoard = () => {
    return (
        <div className="grow px-4 grid sm:grid-rows-3">
            <div className="sm:row-span-2 grid grid-cols-1 sm:grid-cols-2">
                <EventBoard />
                <MonthlyBoard />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3">
                <PopularBoard />
                <NewsBoard />
                <RankingBoard />
            </div>
        </div>
    );
};

const BoardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="p-4 m-2 rounded border-2 border-slate-300 flex-center">{children}</div>;
};

const PopularBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl">인기 글</div>
                <div className="grow">
                    <div>1. 첫 번째 글</div>
                    <div>2. 두 번째 글</div>
                    <div>3. 세 번째 글</div>
                    <div>4. 네 번째 글</div>
                </div>
            </div>
        </BoardWrapper>
    );
};

const NewsBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl">최신 소식</div>
                <div className="grow">
                    <div>1. 첫 번째 글</div>
                    <div>2. 두 번째 글</div>
                    <div>3. 세 번째 글</div>
                    <div>4. 네 번째 글</div>
                </div>
            </div>
        </BoardWrapper>
    );
};

const RankingBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl">최근 검색어 랭킹</div>
                <div className="grow">
                    <div>1. 첫 번째 글</div>
                    <div>2. 두 번째 글</div>
                    <div>3. 세 번째 글</div>
                    <div>4. 네 번째 글</div>
                </div>
            </div>
        </BoardWrapper>
    );
};

const EventBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <Image src="/images/theclimb.png" alt="event" width={300} height={200} />
            </div>
        </BoardWrapper>
    );
};

const MonthlyBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl">이달의 클라이머</div>
                <div className="grow">
                    <div>1. 첫 번째 글</div>
                    <div>2. 두 번째 글</div>
                    <div>3. 세 번째 글</div>
                    <div>4. 네 번째 글</div>
                </div>
            </div>
        </BoardWrapper>
    );
};

export default MainBoard;
