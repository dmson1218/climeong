import { brandList } from "@/data/shoesData";
import Image from "next/image";
import Link from "next/link";

const BrandBoard = () => {
  return (
    <div className="layout grid grid-cols-6 place-items-center gap-1 px-4 md:gap-2 md:px-12">
      {brandList.map(({ brand }) => (
        <Link
          key={brand}
          href={{
            pathname: "shoe",
            query: { brand },
          }}
          className="relative aspect-square w-full overflow-hidden rounded-3xl border-2 border-gray-200 bg-white"
        >
          <div className="flex h-full w-full items-center justify-center transition-transform duration-300 hover:scale-110">
            <Image
              src={`/images/brands/${brand}.png`}
              alt={brand}
              width={96}
              height={96}
              className="object-cover md:scale-125"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrandBoard;
