// import { useQuery } from "react-query";
// import { apiToken } from "../../shared/apis/Apis";
// import { useParams } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";

//Image Import
import MeetingImage from "../../images/MeetingRoom.jpg";

//모임정보 불러오기
// const fetchMeeting = async (meetingId: string | undefined) => {
//   if (!meetingId) {
//     throw new Error("Meeting ID is not provided.");
//   }
//   const response = await apiToken.get(`/api/group/${parseInt(meetingId)}`);
//   return response.data;
// };

//즐겨찾기 추가
// const favoriteMeeting = async (meetingId: string | undefined) => {
//   if (!meetingId) {
//     throw new Error("Meeting ID is not provided.");
//   }
//   const response = await apiToken.post(`/api/bookmark/${parseInt(meetingId)}`);
//   return response.data;
// };

//모임 가입
// const joinMeeting = async (meetingId: string | undefined) => {
//   if (!meetingId) {
//     throw new Error("Meeting ID is not provided.");
//   }
//   const response = await apiToken.post(
//     `/api/group/${parseInt(meetingId)}/join`
//   );
//   return response.data;
// };

//즐겨찾기 목록 불러오기

const MeetingRoom = () => {
  const [favorite, setFavorite] = useState(false);
  // const meetingId = useParams();
  // const {
  //   data: meeting,
  //   isLoading,
  //   error,
  // } = useQuery(["meeting", meetingId], () => fetchMeeting(meetingId.id));

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>An error has occurred: {error.toString()}</div>;
  // }

  return (
    <StContainer>
      <StForm>
        <StLeftForm>
          <StProfileSec>
            <StTitle>MBTI_P 모여라</StTitle>
            <StDesc>
              서울부터 해남까지 걸어가면서 일어난 일들 #극기훈련 #사람살려
              #실시간모집 #2030 #J참교육
            </StDesc>
            <StProfile>
              <StProfileImg src={MeetingImage} />
              <StProfileRight>
                <StNickName>빛이나는무계획</StNickName>
                <StProfileDesc>
                  <p>130/300명</p>|<p>개설일 2024.12.11</p>
                </StProfileDesc>
              </StProfileRight>
            </StProfile>
            <StButtonSec>
              {favorite && favorite === true ? (
                <StButton onClick={() => setFavorite(false)}>
                  ♥ 즐겨찾기
                </StButton>
              ) : (
                <StButton onClick={() => setFavorite(true)}>
                  ♡ 즐겨찾기
                </StButton>
              )}
              <StButton>♡ 참여하기</StButton>
            </StButtonSec>
          </StProfileSec>
        </StLeftForm>
      </StForm>
    </StContainer>
  );
};

export default MeetingRoom;

const StContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.div`
  width: 1100px;
  height: 630px;
  border-radius: 30px;
  box-shadow: 11px 13px 4px 0px #0000001a;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StLeftForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  width: 460px;
  height: 630px;
  border-radius: 30px;
  background-image: url(${MeetingImage});
  background-size: cover;
  background-position: center;
`;

const StProfileSec = styled.div`
  margin: 0 auto;
`;

const StTitle = styled.h2`
  color: #ffffff;
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const StDesc = styled.p`
  width: 350px;
  height: auto;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 40px;
`;

const StProfile = styled.div`
  color: #ffffff;
  display: flex;
  margin-bottom: 30px;
`;

const StProfileImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const StProfileRight = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const StNickName = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StProfileDesc = styled.div`
  display: flex;
  gap: 10px;
`;

const StButtonSec = styled.div`
  width: 394px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StButton = styled.button`
  width: 187px;
  height: 35px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
`;
