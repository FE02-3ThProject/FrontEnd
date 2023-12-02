import FloatingButton from "../../components/FloatingButton";
import MainSwiper from "../../components/Swiper/MainSwiper";
import Categories from "../../components/categories/Categories";
import styled from "styled-components";

const MainPage = () => {
  return (
    <StContainer>
      <MainSwiper />
      <Categories />

      <FloatingButton href="additional">+</FloatingButton>
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
