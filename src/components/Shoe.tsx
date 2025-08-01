import Image from "next/image";
import Link from "next/link";

const Shoe = ({ shoeName }: { shoeName: string }) => {
  const [brand, model] = shoeName.split("_");

  return (
    <div className="flex grow flex-col items-center">
      <Link
        href={`shoe/${shoeName}`}
        className="relative aspect-square w-36 overflow-hidden rounded-lg border border-gray-200 md:w-48"
      >
        <Image
          src={`/images/shoes/${shoeName}.jpg`}
          alt={shoeName}
          width={192}
          height={192}
          className="w-full object-cover p-2"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/20 to-transparent px-2 py-1 text-left text-xs">
          <div className="font-normal italic"># {brand}</div>
          <div className="font-normal italic"># {model}</div>
        </div>
      </Link>
    </div>
  );
};

export default Shoe;
