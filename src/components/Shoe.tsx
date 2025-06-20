import Image from "next/image";

const Shoe = ({ shoeName }: { shoeName: string }) => {
  return (
    <Image
      src={`/images/${shoeName}.jpg`}
      alt={shoeName}
      width={288}
      height={288}
      className="m-1 size-72 rounded-lg transition-transform duration-200 ease-in-out hover:scale-110 sm:m-2"
    />
  );
};

export default Shoe;
