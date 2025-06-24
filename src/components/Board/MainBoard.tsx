import BoardTitle from "@/components/Board/BoardTitle";
import PreviewBoard from "@/components/Board/PreviewBoard";
import ShoesBoard from "@/components/Board/ShoesBoard";
import Image from "next/image";
import Link from "next/link";

const MainBoard = () => {
  return (
    <div className="layout mt-24 min-h-[calc(100vh-6rem-60px)] bg-white">
      <div className="my-3 flex h-auto w-full gap-4 px-8 md:px-12">
        <Link
          href="https://www.instagram.com/angmond_climb/"
          className="group relative flex grow overflow-hidden rounded-lg bg-gray-200"
        >
          <Image
            src="/images/Instagram.jpeg"
            alt="Main Banner"
            width={600}
            height={450}
            className="grow object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full px-4 py-3 text-2xl text-white">
            <div className="font-normal italic">@angmond_climb</div>
          </div>
        </Link>

        <div className="hidden w-48 grow rounded-lg bg-gray-200 md:block"></div>
      </div>
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
      {/* <br />
      <BoardTitle
        boardType="community"
        title="클라이머 커뮤니티에 어서 오세요!"
      />
      <PreviewBoard boardType="community" />
      <br />
      <BoardTitle boardType="crew" title="함께 등반할 사람을 찾아보세요!" />
      <PreviewBoard boardType="crew" /> */}
    </div>
  );
};

export default MainBoard;
