"use client";

import { useEffect, useRef } from "react";
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

const ShoesBoard = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = containerRef.current;
        if (!scrollContainer) return;

        const interval = setInterval(() => {
            if (
                scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
                scrollContainer.scrollWidth
            ) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += 1;
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <BoardWrapper>
            <div ref={containerRef} className="my-auto flex overflow-x-auto whitespace-nowrap">
                {shoeNames.map((shoeName) => (
                    <Shoe key={shoeName} shoeName={shoeName} />
                ))}
            </div>
        </BoardWrapper>
    );
};

//     const ShoesBoard = () => {
//     const [visibleShoes, setVisibleShoes] = useState<string[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const containerRef = useRef(null);

//     const batchSize = 10;

//     const loadMoreImages = () => {
//         if (loading) return;
//         setLoading(true);
//         setTimeout(() => {
//             setVisibleShoes((prevShoes) => [
//                 ...prevShoes,
//                 ...shoeNames.slice(prevShoes.length, prevShoes.length + batchSize),
//             ]);
//             setLoading(false);
//         }, 500);
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     loadMoreImages();
//                 }
//             },
//             {
//                 rootMargin: "100px",
//             }
//         );

//         const lastElement = containerRef.current?.lastElementChild;
//         if (lastElement) {
//             observer.observe(lastElement);
//         }

//         loadMoreImages();

//         return () => {
//             observer.disconnect();
//         };
//     }, [loading]);

//     return (
//         <BoardWrapper>
//             <div
//                 ref={containerRef}
//                 className="flex overflow-x-auto py-4"
//                 style={{ width: "100%", height: "200px" }}
//             >
//                 {visibleShoes.map((shoeName) => (
//                     <div key={shoeName} className="flex-shrink-0">
//                         <Shoe shoeName={shoeName} />
//                     </div>
//                 ))}
//                 {loading && (
//                     <div className="flex justify-center w-full py-2">
//                         <span>Loading...</span>
//                     </div>
//                 )}
//             </div>
//         </BoardWrapper>
//     );
// };

export default ShoesBoard;
