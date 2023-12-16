import styled from "styled-components";

interface NoticeProps {
  data: {
    title: string;
    content: string;
    createAt: string; // 또는 Date 타입을 사용할 수 있습니다.
  };
}

const Notice: React.FC<NoticeProps> = ({ data }) => {
  // 마침표를 기준으로 내용을 분리합니다.
  const contentArray = data.content.split(". ");

  return (
    <StContainer>
      <StTitle>{data.title}</StTitle>
      {contentArray.map((content, index) => (
        <StContent key={index}>{content}</StContent>
      ))}
    </StContainer>
  );
};

export default Notice;

const StContainer = styled.div`
  width: 100%;
  height: auto;
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
  margin-bottom: 20px;
`;

const StContent = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;
