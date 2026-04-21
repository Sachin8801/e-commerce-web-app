"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Image from "next/image";
import { cn } from "@/lib/utils";

type BannerSliderProps = {
  bannerImages: { img: string }[];
  className?: string;
};

export default function BannerSlider({
  bannerImages,
  className,
}: BannerSliderProps) {
  const [plugins, setPlugins] = useState<any[]>([]);

  // ✅ CRITICAL FIX: load autoplay only in browser
  useEffect(() => {
    let mounted = true;

    const loadPlugin = async () => {
      const AutoPlay = (await import("embla-carousel-autoplay")).default;

      if (mounted) {
        setPlugins([
          AutoPlay({
            delay: 5000,
          }),
        ]);
      }
    };

    loadPlugin();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={cn("container mt-10", className)}>
      <Carousel plugins={plugins}>
        <CarouselContent>
          {bannerImages.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Image
                width={600}
                height={400}
                alt="banner"
                src={item.img}
                className="w-full h-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}