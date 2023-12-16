import styled from "styled-components";

interface NoticeProps {
  data: {
    title: string;
    content: string;
    createAt: string; // 또는 Date 타입을 사용할 수 있습니다.
  };
}

const Notice: React.FC<NoticeProps> = ({ data }) => {
  return (
    <StContainer>
      <StTitle>{data.title}</StTitle>
      <StContent>{data.content}</StContent>
    </StContainer>
  );
};

export default Notice;

const StContainer = styled.div`
  width: 100%;
  height: 40px;
  text-indent: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  border-radius: 10px;
  color: black;
`;

const StTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StContent = styled.p`
  font-size: 12px;
  font-weight: 500;
`;
