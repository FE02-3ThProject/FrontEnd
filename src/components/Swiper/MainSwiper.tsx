import { FC } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./MainSwiper.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const IMAGE_1_URL =
  "https://images.pexels.com/photos/19235974/pexels-photo-19235974.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_2_URL =
  "https://images.pexels.com/photos/19143254/pexels-photo-19143254.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_3_URL =
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_4_URL =
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_5_URL =
  "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_6_URL =
  "https://images.pexels.com/photos/2125075/pexels-photo-2125075.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_7_URL =
  "https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_8_URL =
  "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1600";
const IMAGE_9_URL =
  "https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg?auto=compress&cs=tinysrgb&w=1600";

const MainSwiper: FC = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 1" src={IMAGE_1_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 2" src={IMAGE_2_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 3" src={IMAGE_3_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 4" src={IMAGE_4_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 5" src={IMAGE_5_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 6" src={IMAGE_6_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 7" src={IMAGE_7_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 8" src={IMAGE_8_URL} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 9" src={IMAGE_9_URL} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainSwiper;
