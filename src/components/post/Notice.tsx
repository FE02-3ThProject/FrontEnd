import styled from "styled-components";

const Notice = () => {
  return (
    <StContainer>
      <StTitle>공지사항</StTitle>
      <StContent>
        공지사항 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      </StContent>
    </StContainer>
  );
};

export default Notice;

const StContainer = styled.div`
  width: 600px;
  height: 40px;
  text-indent: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const StTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

const StContent = styled.p`
  font-size: 12px;
`;
