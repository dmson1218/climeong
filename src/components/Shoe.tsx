import Image from "next/image";
import Link from "next/link";

const Shoe = ({ shoeName }: { shoeName: string }) => {
  const [manufacturer, model] = shoeName.split("_");

  return (
    <Link href="" className="flex grow flex-col items-center">
      <div className="relative aspect-square w-48 overflow-hidden rounded-lg">
        <Image
          src={`/images/${shoeName}.jpg`}
          alt={shoeName}
          width={192}
          height={192}
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/20 to-transparent px-2 py-1 text-left text-xs">
          <div className="font-normal italic"># {manufacturer}</div>
          <div className="font-normal italic"># {model}</div>
        </div>
      </div>
    </Link>
  );
};

export default Shoe;
