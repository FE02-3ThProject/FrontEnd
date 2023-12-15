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
      <StDate>{data.createAt}</StDate>
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

const StDate = styled.p`
  font-size: 12px;
`;
