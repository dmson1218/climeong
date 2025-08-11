import BoardWrapper from "@/components/Board/BoardWrapper";
import { shoeNames } from "@/data/shoesData";
import Image from "next/image";
import Link from "next/link";

export default function ShoePage() {
  return (
    <div className="layout mt-24 grid min-h-[calc(100vh-6rem-60px)]">
      <BoardWrapper>
        <div className="flex flex-wrap items-center">
          {shoeNames.map((shoeName) => (
            <div
              key={shoeName}
              className="w-1/2 flex-shrink-0 p-1 sm:w-1/3 lg:w-1/4"
            >
              <Link
                href={`/shoe/${shoeName}`}
                className="relative flex aspect-square flex-col items-center overflow-hidden rounded-lg border border-gray-200"
              >
                <Image
                  src={`/images/shoes/${shoeName}.jpg`}
                  alt={shoeName}
                  width={192}
                  height={192}
                  className="w-full object-cover p-2 transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/20 to-transparent px-2 py-1 text-left text-xs">
                  <div className="font-normal italic">
                    # {shoeName.split("_")[0]}
                  </div>
                  <div className="font-normal italic">
                    # {shoeName.split("_")[1]}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </BoardWrapper>
    </div>
  );
}
