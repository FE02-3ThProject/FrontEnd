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
    };
  };
}

const JoindeMeeting: React.FC<JoindeMeetingProps> = ({ data }) => {
  return (
    <StContainer>
      {/* <StTitle>{data.title}</StTitle>
      <StContent>{data.image}</StContent>
      <StContent>{data.description}</StContent>
      <StContent>{data.maxMembers}</StContent>
      <StContent>{data.locationId.name}</StContent>
      <StContent>{data.categoryId.name}</StContent>
      <StContent>{data.createAt}개설일</StContent> */}
      <StTitleImg>이미지</StTitleImg>
      <StContentWrap>
      <StTitle>타이틀</StTitle>
      <StContent>설명</StContent>
      <StContent>최대인원</StContent>
      <StContent>지역</StContent>
      <StContent>카테고리</StContent>
      <StContent>개설일</StContent>
      </StContentWrap>
    </StContainer>
  );
};

export default JoindeMeeting;

const StContainer = styled.div`
  width: 450px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 16px;
  border: 1px solid red;
`;

const StTitleImg = styled.div`
width: 170px;
height: 170px;
border-radius: 170px;
border: 1px solid black;
`

const StContentWrap = styled.div`
width: 200px;
border: 1px solid green;
`

const StTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

const StContent = styled.p`
  font-size: 12px;
  color: black;
`;
