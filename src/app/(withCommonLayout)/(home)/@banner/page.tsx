"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Container from "@/src/components/ui/Container";

const Banner = () => {
  return (
    <Container>
      <div className="h-[450px] w-full pt-12">
        <Swiper
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          centeredSlides={false}
          className="mySwiper h-full"
          modules={[Autoplay, Pagination, Navigation]}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          spaceBetween={30}
        >
          <SwiperSlide>
            <Image
              alt="banner image"
              className=" h-full w-full"
              height={500}
              src="https://res.cloudinary.com/dudjn6epk/image/upload/v1734165428/vqq76z0kxztjkfjakzvp.webp"
              width={1000}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner image"
              className=" h-full w-full"
              height={500}
              src="https://res.cloudinary.com/dudjn6epk/image/upload/v1734165434/esu07maf89zigc64h8er.webp"
              width={1000}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </Container>
  );
};

export default Banner;
