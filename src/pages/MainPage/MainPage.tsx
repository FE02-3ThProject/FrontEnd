import Categories from "../../components/categories/Categories";
import styled from "styled-components";

const MainPage = () => {
  return (
    <StContainer>
      {/* <MainSwiper /> */}
      <Categories />
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
