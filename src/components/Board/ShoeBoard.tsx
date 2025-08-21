"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import shoesData, { brandList, shoeNames } from "@/data/shoesData";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ShoeBoard = () => {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    brandList.find((b) => b.brand === brand)?.brandKr || "All",
  ]);
  const [selectedPrice, setSelectedPrice] = useState<
    "under15" | "over15" | null
  >(null);

  const priceFilter = (
    price: number,
    filter: "under15" | "over15" | null,
  ): boolean => {
    if (!filter) return true;
    if (filter === "under15") return price <= 150000;
    if (filter === "over15") return price > 150000;
    return true;
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const filteredShoes = shoeNames.filter((shoeName) => {
    const shoe = shoesData[shoeName];
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(shoe.brandKr);
    const priceMatch = priceFilter(shoe.priceKr, selectedPrice);
    return brandMatch && priceMatch;
  });

  return (
    <div className="layout mt-20 grid min-h-[calc(100vh-6rem-60px)]">
      <BoardWrapper>
        <div className="ml-1 flex flex-col pb-3 pr-1 pt-4">
          <div className="flex flex-col justify-between gap-2">
            <div className="flex w-80 flex-wrap items-center gap-2 md:w-full">
              {brandList.map(({ brandKr }) => (
                <button
                  key={brandKr}
                  onClick={() => toggleBrand(brandKr)}
                  className={`flex-center rounded-full px-4 py-0.5 font-medium ${
                    selectedBrands.includes(brandKr)
                      ? "bg-blue-200"
                      : "bg-gray-200"
                  }`}
                >
                  {brandKr}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() =>
                  setSelectedPrice((prev) =>
                    prev === "under15" ? null : "under15",
                  )
                }
                className={`flex-center rounded-full px-4 py-0.5 font-medium ${
                  selectedPrice === "under15" ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                15만원 이하
              </button>
              <button
                onClick={() =>
                  setSelectedPrice((prev) =>
                    prev === "over15" ? null : "over15",
                  )
                }
                className={`flex-center rounded-full px-4 py-0.5 font-medium ${
                  selectedPrice === "over15" ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                15만원 이상
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          {filteredShoes.map((shoeName) => (
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
};

export default ShoeBoard;
