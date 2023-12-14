import styled from "styled-components";
import Spinner from "../../images/Spinner.gif";

const Loading = () => {
  return (
    <StContainer>
      <h3>잠시만 기다려주세요.</h3>
      <img src={Spinner} alt="로딩" />
    </StContainer>
  );
};

export default Loading;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
