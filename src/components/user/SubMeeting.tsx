import styled from "styled-components";

interface SubMeetingProps {
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

const SubMeeting: React.FC<SubMeetingProps> = ({ data }) => {
  return (
    <StContainer>
      {/* <StTitle>{data.title}타이틀</StTitle>
      <StContent>{data.image}이미지</StContent>
      <StContent>{data.description}내용</StContent>
      <StContent>{data.maxMembers}최대인원</StContent>
      <StContent>{data.locationId.name}지역</StContent>
      <StContent>{data.categoryId.name}카테고리</StContent>
      <StContent>{data.createAt}개설일</StContent> */}
      <StTitle>타이틀</StTitle>
      <StContent>이미지</StContent>
      <StContent>내용</StContent>
      <StContent>최대인원</StContent>
      <StContent>지역</StContent>
      <StContent>카테고리</StContent>
      <StContent>개설일</StContent>
    </StContainer>
  );
};

export default SubMeeting;

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
