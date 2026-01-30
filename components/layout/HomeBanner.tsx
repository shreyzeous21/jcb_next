"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { homeBanner } from "./constant";
import Image from "next/image";

export default function HomeBanner() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      loop
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      className="w-full"
    >
      {homeBanner.map((banner, index) => (
        <SwiperSlide key={banner.image}>
          <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden rounded-xl bg-muted">
            <Image
              src={banner.image}
              alt="JCV Parts Banner"
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={95}
              sizes="100vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
