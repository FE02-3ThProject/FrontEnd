import styled from "styled-components";

interface JoindeMeetingProps {
  data: {
    groupId: number;
    title: string;
    content: string;
    createAt: string;
    image: string;
    description: string;
    maxMembers: number;
    locationId: {
      locationId: string;
      name: string;
    };
    categoryId: {
      categoryId: string;
      name: string;
    }
  };
}

const JoindeMeeting: React.FC<JoindeMeetingProps> = ({ data }) => {
  return (
    <StContainer>
      <StTitle>{data.title}</StTitle>
      <StContent>{data.image}</StContent>
      <StContent>{data.description}</StContent>
      <StContent>{data.maxMembers}</StContent>
      <StContent>{data.locationId.name}</StContent>
      <StContent>{data.categoryId.name}</StContent>
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
