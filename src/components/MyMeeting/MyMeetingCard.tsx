import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Meeting {
  data: {
    groupId: number;
    locationName: string;
    categoryName: string;
    title: string;
    description: string;
    image: string;
    maxMembers: number;
    createdAt: string;
    leaderEmail: string;
    joinedGroupMembers: number;
  };
}

const MyMeetingCard: React.FC<Meeting> = ({ data }) => {
  const navigator = useNavigate();
  const meetingId = data.groupId;

  return (
    <StContainer
      onClick={() => {
        navigator(`/meeting/${meetingId}`);
      }}
    >
      <StWrap>
        <StTitleImg>
          <img src={data.image} />
        </StTitleImg>
        <StContentWrap>
          <StTitle>{data.title}타이틀</StTitle>
          <StMeetInfo>
            <StContent>지역: {data.locationName}</StContent>
            <StContent>카테고리: {data.categoryName}</StContent>
          </StMeetInfo>
          <StFootText>
            <StContent>현재인원: {data.joinedGroupMembers}</StContent>
            <StContent>최대인원: {data.maxMembers}</StContent>
          </StFootText>
          <StContent>개설일: {data.createdAt}</StContent>
        </StContentWrap>
      </StWrap>
    </StContainer>
  );
};

export default MyMeetingCard;

const StContainer = styled.div`
  width: 1096px;
  height: 200px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 16px;
  background: #262d34;
  cursor: pointer;
`;

const StWrap = styled.div`
  width: 96%;
  height: 80%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px;
`;

const StTitleImg = styled.div`
  width: 300px;
  height: 160px;
  border-radius: 16px;
  border: 1px solid #d9d9d9;
  > img {
    width: 300px;
    height: 156px;
    border-radius: 16px;
  }
`;

const StContentWrap = styled.div`
  width: 69%;
  height: 170px;
`;

const StTitle = styled.h3`
  min-width: 300px;
  max-width: 350px;
  height: 62px;
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
  text-align: left;
  margin-bottom: 10px;
`;
const StMeetInfo = styled.div`
  display: flex;
  align-items: end;
  justify-content: left;
  margin-bottom: 15px;
  gap: 39px;
`;

const StFootText = styled.div`
  display: flex;
  align-items: end;
  justify-content: left;
  gap: 30px;
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
