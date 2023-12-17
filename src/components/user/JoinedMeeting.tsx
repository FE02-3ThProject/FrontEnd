import styled from "styled-components";

interface JoindeMeetingProps {
  data: {
    id: string;
    title: string;
    content: string;
    createAt: string;
  };
}

const JoindeMeeting: React.FC<JoindeMeetingProps> = ({ data }) => {
  return (
    <StContainer>
      <StTitle>{data.title}</StTitle>
      <StContent>{data.content}</StContent>
    </StContainer>
  );
};

export default JoindeMeeting;

const StContainer = styled.div`
  width: 600px;
  height: 30px;
  text-indent: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const StTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

const StContent = styled.p`
  font-size: 12px;
`;
