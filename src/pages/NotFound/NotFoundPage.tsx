import NotFound from "../../images/meeting/not-found.png";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <StContainer>
      <StNotFoundImg src={NotFound} />
    </StContainer>
  );
};

export default NotFoundPage;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StNotFoundImg = styled.img`
  width: 50%;
  height: 70%;
  margin-top: 50px;
  margin-bottom: 50px;
`;
