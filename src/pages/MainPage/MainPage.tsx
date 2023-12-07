import FloatingButton from "../../components/common/FloatingButton";
import MeetingCard from "../../components/Meetings/MeetingCard";
import MainSwiper from "../../components/Swiper/MainSwiper";
import Categories from "../../components/categories/Categories";
import styled from "styled-components";

const MainPage = () => {
  return (
    <StContainer>
      <MainSwiper />
      <Categories />
      <StTitle>추천 모임</StTitle>
      <StCardContainer>
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
      </StCardContainer>
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
  height: 900px;
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
  margin: 30px 0 0 170px;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -1px;
`;
