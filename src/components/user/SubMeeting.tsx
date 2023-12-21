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
      <StTitleImg><img src={data.image} /></StTitleImg>
      <StContentWrap>
        <StTitle>{data.title}타이틀</StTitle>
        <StMeetInfo>
          <StContent>지역: {data.locationId.name}</StContent>
          <StContent>카테고리: {data.categoryId.name}</StContent>
        </StMeetInfo>
        <StFootText>
          <StContent>최대인원: {data.maxMembers}</StContent>
          <StContent>개설일: {data.createAt}</StContent>
        </StFootText>
      </StContentWrap>
    </StContainer>
  );
};

export default SubMeeting;

const StContainer = styled.div`
  width: 450px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 16px;
  background: #262d34;
`;

const StTitleImg = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 170px;
  >img {
    width: 170px;
    height: 170px;
    border-radius: 170px;
  }
`;

const StContentWrap = styled.div`
  width: 240px;
  height: 170px;
`;

const StTitle = styled.h3`
  min-width: 194px;
  max-width: 240px;
  height: 62px;
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
  text-align: right;
  margin-bottom: 10px;
`;
const StMeetInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  margin-bottom: 10px;
`;

const StFootText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
`;

const StContent = styled.div`
  font-size: 12px;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  text-align: left;
  text-align: right;
  text-justify: end;
`;
