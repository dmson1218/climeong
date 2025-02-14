const MainBoard = () => {
    return (
        <div className="grow p-4 grid sm:grid-rows-3">
            <div className="grid grid-cols-1 sm:grid-cols-4">
                <PopularBoard />
                <NewsBoard />
                <RankingBoard />
            </div>
            <div className="row-span-0 sm:row-span-2 grid grid-cols-1 sm:grid-cols-2">
                <EventBoard />
                <MonthlyBoard />
            </div>
        </div>
    );
};

const BoardWrapper: React.FC<{ children: React.ReactNode; rowStart?: number }> = ({
    children,
    rowStart,
}) => {
    return (
        <div
            className={`sm:col-span-${rowStart} p-4 m-2 rounded border border-gray-300 flex-center`}
        >
            {children}
        </div>
    );
};

const PopularBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl font-semibold">인기 글</div>
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
                <div className="text-xl font-semibold">최신 소식</div>
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
        <BoardWrapper rowStart={2}>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl font-semibold">최근 검색어 랭킹</div>
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
                <div className="text-xl font-semibold">이벤트</div>
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

const MonthlyBoard = () => {
    return (
        <BoardWrapper>
            <div className="flex-center flex-col gap-2">
                <div className="text-xl font-semibold">이달의 클라이머</div>
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
