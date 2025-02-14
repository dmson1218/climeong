const BoardWrapper = () => {
    return (
        <div className="grow p-4 grid grid-cols-1 sm:grid-cols-4">
            <PopularBoard />
            <NewsBoard />
            <RankingBoard />
            <EventBoard />
            <MonthlyBoard />
        </div>
    );
};

const PopularBoard = () => {
    return (
        <div className="col-span-1 sm:col-span-1 p-4 sm:pt-8 m-2 rounded border border-gray-300 flex-center flex-col gap-4">
            <div className="text-xl font-semibold">인기 글</div>
            <div className="grow">
                <div>1. 첫 번째 글</div>
                <div>2. 두 번째 글</div>
                <div>3. 세 번째 글</div>
                <div>4. 네 번째 글</div>
            </div>
        </div>
    );
};

const NewsBoard = () => {
    return (
        <div className="col-span-1 sm:col-span-1 p-4 sm:pt-8 m-2 rounded border border-gray-300 flex-center flex-col gap-4">
            <div className="text-xl font-semibold">최신 소식</div>
            <div className="grow">
                <div>1. 첫 번째 글</div>
                <div>2. 두 번째 글</div>
                <div>3. 세 번째 글</div>
                <div>4. 네 번째 글</div>
            </div>
        </div>
    );
};

const RankingBoard = () => {
    return (
        <div className="col-span-1 sm:col-span-2 p-4 sm:pt-8 m-2 rounded border border-gray-300 flex-center flex-col gap-4">
            <div className="text-xl font-semibold">최근 검색어 랭킹</div>
            <div className="grow">
                <div>1. 첫 번째 글</div>
                <div>2. 두 번째 글</div>
                <div>3. 세 번째 글</div>
                <div>4. 네 번째 글</div>
            </div>
        </div>
    );
};

const EventBoard = () => {
    return (
        <div className="col-span-1 sm:col-span-2 p-4 sm:pt-8 m-2 rounded border border-gray-300 flex-center flex-col gap-4">
            <div className="text-xl font-semibold">이벤트</div>
            <div className="grow">
                <div>1. 첫 번째 글</div>
                <div>2. 두 번째 글</div>
                <div>3. 세 번째 글</div>
                <div>4. 네 번째 글</div>
            </div>
        </div>
    );
};

const MonthlyBoard = () => {
    return (
        <div className="col-span-1 sm:col-span-2 p-4 sm:pt-8 m-2 rounded border border-gray-300 flex-center flex-col gap-4">
            <div className="text-xl font-semibold">이달의 클라이머</div>
            <div className="grow">
                <div>1. 첫 번째 글</div>
                <div>2. 두 번째 글</div>
                <div>3. 세 번째 글</div>
                <div>4. 네 번째 글</div>
            </div>
        </div>
    );
};

export default BoardWrapper;
