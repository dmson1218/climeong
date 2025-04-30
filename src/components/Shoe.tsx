import Image from "next/image";

const Shoe = ({ shoeName }: { shoeName: string }) => {
    return (
        <Image
            src={`/images/${shoeName}.jpg`}
            alt={shoeName}
            width={288}
            height={288}
            className="size-72 hover:scale-110 transition-transform duration-200 ease-in-out rounded-lg m-1 sm:m-2"
        />
    );
};

export default Shoe;
