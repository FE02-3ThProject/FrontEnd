import FloatingButton from "../../components/common/FloatingButton";
import MeetingCard from "../../components/Meetings/MeetingCard_before";
import MainSwiper from "../../components/Swiper/MainSwiper";
import Categories from "../../components/categories/Categories";
import styled from "styled-components";
import Mainbanner from "../../components/banner/Mainbanner";
import MainBottomBanner from "../../components/banner/MainBottomBanner";
import { useEffect, useState } from "react";
import { apiToken } from "../../shared/apis/Apis";

const MainPage = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        const response = await apiToken.get("/api/group/all"); // Adjust this endpoint to your actual meeting rooms API endpoint
        setMeetingRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch meeting rooms:", error);
      }
    };

    fetchMeetingRooms();
  }, []);
  return (
    <StContainer>
      <MainSwiper />
      <Categories />
      <StTitle>추천 모임</StTitle>
      <StCardContainer>
        {meetingRooms.map((room) => (
          <MeetingCard
            key={room.id}
            meetingId={room.meetingId}
            userId={room.userId}
          />
        ))}
      </StCardContainer>
      <StBannerContainer>
        <Mainbanner />
      </StBannerContainer>
      <StBBannerContainer>
        <MainBottomBanner />
      </StBBannerContainer>
      <FloatingButton href="additional">+</FloatingButton>
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const StCardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  flex-wrap: wrap;

  /* @media (min-width: 640px) {
    .sm\:mx-10 {
      min-width: 640px;
      margin-left: 2.5rem;
      margin-right: 2.5rem;
    }
  } */
`;

const StTitle = styled.div`
  margin: 30px 0 0 70px;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -1px;
`;

const StBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 0 0 0;
`;
const StBBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 70px 0;
`;
