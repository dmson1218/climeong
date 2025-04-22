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
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">암벽화 정보</div>
                <div className="grow mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {shoeNames.map((shoeName) => (
                        <Shoe key={shoeName} shoeName={shoeName} />
                    ))}
                </div>
            </BoardWrapper>
        </div>
    );
}
