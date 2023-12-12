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

import mainvisual01 from "../../images/main/mainvisual01.png";
import mainvisual02 from "../../images/main/mainvisual02.png";
import mainvisual03 from "../../images/main/mainvisual03.png";
import mainvisual04 from "../../images/main/mainvisual04.png";
import mainvisual05 from "../../images/main/mainvisual05.png";
import mainvisual06 from "../../images/main/mainvisual06.png";
import mainvisual07 from "../../images/main/mainvisual07.png";
import mainvisual08 from "../../images/main/mainvisual08.png";
import mainvisual09 from "../../images/main/mainvisual09.png";
import mainvisual10 from "../../images/main/mainvisual10.png";

const MainSwiper: FC = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 1" src={mainvisual01} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 2" src={mainvisual02} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 3" src={mainvisual03} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 4" src={mainvisual04} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 5" src={mainvisual05} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 6" src={mainvisual06} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 7" src={mainvisual07} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 8" src={mainvisual08} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 9" src={mainvisual09} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img alt="scenery 10" src={mainvisual10} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainSwiper;
