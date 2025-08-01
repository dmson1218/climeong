import BoardWrapper from "@/components/Board/BoardWrapper";
import Image from "next/image";
import Link from "next/link";

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

export default function ShoePage() {
  return (
    <div className="layout mt-24 grid min-h-[calc(100vh-6rem-60px)]">
      <BoardWrapper>
        <div className="mx-3 flex flex-wrap items-center md:mx-0">
          {shoeNames.map((shoeName) => (
            <div
              key={shoeName}
              className="w-1/2 flex-shrink-0 p-1 sm:w-1/3 lg:w-1/4"
            >
              <Link
                href=""
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
