"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import Shoe from "@/components/Shoe";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const shoeNames = [
  "Butora_NewComet",
  "Butora_Senegi",
  "Butora_Spider",
  "LaSportiva_Skwama",
  "LaSportiva_SkwamaVegan",
  "LaSportiva_SolutionComp",
  "LaSportiva_Theory",
  "MadRock_Drifter",
  "MadRock_Drone",
  "MadRock_DroneComp",
  "MadRock_Rover",
  "Scarpa_Drago",
  "Scarpa_DragoLV",
  "Scarpa_Veloce",
  "Scarpa_VSR",
  "Tenaya_Indalo",
  "Tenaya_Oasi",
  "Tenaya_OasiLV",
  "Unparallel_Flagship",
  "Unparallel_FlagshipPro",
  "Unparallel_Qubit",
];

const CARD_WIDTH = 192;
const GAP = 8;
const CARD_TOTAL_WIDTH = CARD_WIDTH + GAP;

const ShoesBoard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);

        const count = Math.floor(width / CARD_TOTAL_WIDTH);
        setVisibleCount(Math.max(1, count));

        setIsMobile(window.innerWidth < 768);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    setStartIndex(0);

    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [isMobile]);

  const maxIndex = shoeNames.length - visibleCount;
  const totalContentWidth = shoeNames.length * CARD_TOTAL_WIDTH - GAP;

  let offset = startIndex * CARD_TOTAL_WIDTH;
  const maxOffset = totalContentWidth - containerWidth;
  if (offset > maxOffset) {
    offset = maxOffset > 0 ? maxOffset : 0;
  }

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + visibleCount, maxIndex));
  };

  return (
    <BoardWrapper>
      <div className="relative mt-2 w-full">
        <button
          aria-label="Prev"
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white p-1.5 opacity-70 shadow-xl hover:opacity-100 active:scale-95 disabled:hidden md:block"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Next"
          onClick={handleNext}
          disabled={startIndex >= maxIndex}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full border bg-white p-1.5 opacity-70 shadow-xl hover:opacity-100 active:scale-95 disabled:hidden md:block"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div
          ref={containerRef}
          className={`${isMobile ? "overflow-x-auto" : "overflow-x-hidden"}`}
        >
          <div
            className="flex flex-nowrap gap-1 transition-transform duration-300 ease-in-out md:gap-2"
            style={{
              transform: `translateX(-${offset}px)`,
            }}
          >
            {shoeNames.map((shoeName) => (
              <Shoe key={shoeName} shoeName={shoeName} />
            ))}
          </div>
        </div>
      </div>
    </BoardWrapper>
  );
};

export default ShoesBoard;
