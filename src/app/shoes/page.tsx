import Image from "next/image";
import { BoardWrapper } from "@/components/MainBoard";

const shoeImages = [
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

export default function ShoesPage() {
    return (
        <div className="min-h-[calc(100vh-5rem-60px)] mt-20 grid px-4">
            <BoardWrapper>
                <div className="my-3 flex-center text-xl mb-4">암벽화 정보</div>
                <div className="grow mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {shoeImages.map((shoe) => (
                        <Image
                            key={shoe}
                            src={`/images/${shoe}.jpg`}
                            alt={shoe}
                            width={300}
                            height={300}
                            className="hover:scale-110 transition-transform duration-200 ease-in-out rounded-lg m-1 sm:m-2"
                        />
                    ))}
                </div>
            </BoardWrapper>
        </div>
    );
}
