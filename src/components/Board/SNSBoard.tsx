"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const bannerItems = [
  {
    href: "https://www.instagram.com/angmond_climb/",
    src: "/images/Instagram.jpeg",
    alt: "Main Banner 1",
    label: "angmond_climb",
  },
  {
    href: "https://www.instagram.com/angmond_climb/",
    src: "/images/Instagram2.jpeg",
    alt: "Main Banner 2",
    label: "_son_climb",
  },
  {
    href: "https://www.instagram.com/angmond_climb/",
    src: "/images/Instagram3.jpeg",
    alt: "Main Banner 3",
    label: "meong_limbing",
  },
];

const SNSBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const width = el.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;

    const scrollLeft = index * el.clientWidth;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  return (
    <div className="relative my-4 h-auto w-full px-4 md:px-12">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-lg"
      >
        {bannerItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group relative aspect-[5/3] w-full flex-shrink-0 snap-start overflow-hidden bg-gray-200 md:aspect-[2/1]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full px-4 py-2 text-xl text-white md:px-6 md:py-4 md:text-4xl">
              <div className="font-normal"># {item.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 right-14 z-10 flex translate-x-1/2 gap-2 md:right-1/2">
        {bannerItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-2 w-2 rounded-full transition-colors ${
              activeIndex === idx ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SNSBoard;
