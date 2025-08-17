import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import slide1 from "@assets/LandingPage/gemasas-1792x649.jpg";
import slide2 from "@assets/LandingPage/gemstone-1792x649.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const slides = [
  { image: slide1, link: "/search-inventory/all-diamond" },
  { image: slide2, link: "/jewellery" },
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.realIndex);
  };

  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
      setCurrentSlide(index);
    }
  };

  return (
    <div id="cs-slider" className="xl:-mt-10">
      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={2000}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper-container"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="text-center">
            <a href={slide.link}>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto"
              />
            </a>
          </SwiperSlide>
        ))}
        <div className="relative flex space-x-3 z-10 bottom-9 md:bottom-10 lg:bottom-12 xl:bottom-16 2xl:bottom-20 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-[14px] h-[14px] rounded-full ${
                currentSlide === index
                  ? "bg-black"
                  : "bg-transparent border-white border-[2px]"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
