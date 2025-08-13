"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import CommentBoard from "@/components/Board/CommentBoard";
import shoesData from "@/data/shoesData";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ShoeNamePage() {
  const { shoeName } = useParams() as { shoeName: string };
  const currentShoe = shoesData[shoeName];

  return (
    <div className="layout mt-24 flex min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-9rem)]">
      <BoardWrapper>
        <div className="flex-center mb-2 w-full flex-col gap-4 sm:flex-row">
          <div className="w-full flex-shrink-0 sm:w-1/3">
            <Image
              src={`/images/shoes/${shoeName}.jpg`}
              alt={shoeName}
              width={720}
              height={720}
              className="mx-auto w-full rounded-lg border border-gray-200 object-cover p-2 md:w-full"
            />
          </div>
          <div className="my-2 w-full md:ml-4 lg:ml-12">
            <div className="flex items-center justify-between text-2xl font-semibold">
              {currentShoe.nameKr}
              <div className="text-2xl font-semibold">
                ₩ {currentShoe.priceKr.toLocaleString()}
              </div>
            </div>
            {currentShoe.stat && (
              <div className="mt-4 space-y-1.5 md:space-y-2">
                {Object.entries(currentShoe.stat).map(([label, value]) => (
                  <div key={label} className="flex items-center">
                    <span className="w-24 flex-shrink-0 text-sm font-medium md:w-28 md:text-base">
                      {label}
                    </span>
                    <div className="relative h-4 w-full rounded bg-gray-200 md:h-5">
                      <div
                        className="h-4 rounded bg-blue-300 md:h-5"
                        style={{ width: `${(value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <CommentBoard postId={shoeName} />
      </BoardWrapper>
    </div>
  );
}
