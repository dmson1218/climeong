import BoardWrapper from "@/components/Board/BoardWrapper";
import Shoe from "@/components/Shoe";

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
        <div className="flex-center my-3 mb-4 text-xl">암벽화 정보</div>
        <div className="mx-16 grid grow grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {shoeNames.map((shoeName) => (
            <Shoe key={shoeName} shoeName={shoeName} />
          ))}
        </div>
      </BoardWrapper>
    </div>
  );
}
