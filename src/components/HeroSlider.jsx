"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const gameBanners = [
  "https://images.igdb.com/igdb/image/upload/t_1080p/co1wzo.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co4b7v.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co5v3z.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co6oyi.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co5z7r.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co1wzj.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co5v3y.jpg",
  "https://images.igdb.com/igdb/image/upload/t_1080p/co6oyj.jpg",
];

export default function HeroSlider() {
  return (
    <div className="absolute inset-0 -z-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1500}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {gameBanners.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`Game banner ${i + 1}`}
                fill
                className="object-cover brightness-50"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}