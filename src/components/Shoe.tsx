import Image from "next/image";

const Shoe = ({ shoeName }: { shoeName: string }) => {
    return (
        <Image
            src={`/images/${shoeName}.jpg`}
            alt={shoeName}
            width={300}
            height={300}
            className="w-60 h-auto hover:scale-110 transition-transform duration-200 ease-in-out rounded-lg m-1 sm:m-2"
        />
    );
};

export default Shoe;
