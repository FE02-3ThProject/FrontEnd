import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./MainSubSwiper.css";
import { Pagination } from "swiper/modules";
import MeetingCard from "../../components/Meetings/MeetingCard";

interface Group {
  groupId: string;
  locationName: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
  maxMembers: number;
  createdAt: string;
  userId: string;
}

interface MainSubSwiperProps {
  groups: Group[];
}

const MainSubSwiper: FC<MainSubSwiperProps> = ({ groups }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{ clickable: true }}
      breakpoints={{
        "@0.00": { slidesPerView: 1, spaceBetween: 10 },
        "@0.75": { slidesPerView: 2, spaceBetween: 20 },
        "@1.00": { slidesPerView: 3, spaceBetween: 40 },
        "@1.50": { slidesPerView: 4, spaceBetween: 50 },
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {groups.slice(0, 10).map((group) => (
        <SwiperSlide key={group.groupId}>
          <MeetingCard group={group} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSubSwiper;
