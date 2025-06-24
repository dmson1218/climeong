"use client";

import BoardWrapper from "@/components/Board/BoardWrapper";
import Shoe from "@/components/Shoe";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

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

const useResponsiveVisibleCount = () => {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCount(2);
      } else if (width < 1024) {
        setCount(3);
      } else {
        setCount(4);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return count;
};
const ShoesBoard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = useResponsiveVisibleCount();

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, shoeNames.length - visibleCount),
    );
  };

  const visibleShoes = shoeNames.slice(startIndex, startIndex + visibleCount);

  return (
    <BoardWrapper>
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white p-2 shadow-xl"
          disabled={startIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 gap-1 whitespace-nowrap md:grid-cols-3 lg:grid-cols-4">
            {visibleShoes.map((shoeName) => (
              <Shoe key={shoeName} shoeName={shoeName} />
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border bg-white p-2 shadow-xl"
          disabled={startIndex + visibleCount >= shoeNames.length}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </BoardWrapper>
  );
};

export default ShoesBoard;
