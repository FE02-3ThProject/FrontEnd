import React, { useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import { useQuery } from "react-query";
import MyProfileModal from "../../components/user/MyProfileModal";
import styled from "styled-components";
import defaultUserImage from "../../images/default_profile.png";
import { deleteCookie, getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";

type Meeting = {
  id: number;
  title: string;
  description: string;
};

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const navigator = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const deleteUser = async () => {
    const email = getCookie("email");
    const password = getCookie("password");

    const requestData = {
      email: email,
      password: password,
    };
    try {
      const response = await apiToken.put("/api/user/unRegister", requestData);
      console.log(response.data);
      setIsDeleted(true);
      deleteCookie("token");
      deleteCookie("nickname");
      deleteCookie("profileimage");
      deleteCookie("email");
      deleteCookie("password");
      deleteCookie("status");
      deleteCookie("is_login");
      deleteCookie("address");
      window.alert("회원 탈퇴에 성공 하셨습니다.");
      navigator("/");
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
      // 오류 처리 (예: 오류 메시지 표시 등)
    }
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const getMyProfile = async () => {
    const res = await apiToken.get("/api/user/info");
    return res;
  };
  const { data: profileData, isLoading: profileLoading } = useQuery(
    "MY_PROFILE",
    getMyProfile
  );

  const getMyMeetingRoom = async () => {
    const res = await apiToken.get("/api/user/mygroup");
    return res;
  };
  const { data: meetingData, isLoading: meetingLoading } = useQuery(
    "MY_MEETINGS",
    getMyMeetingRoom
  );

  if (profileLoading || meetingLoading) {
    return <div>loading...</div>;
  }
  const S3 = "https://www.snsboom.co.kr/common/img/default_profile.png";

  return (
    <MyProfileContainer>
      <ProfileBox>
        <Title>
          <h2>마이페이지</h2>
          <p>Mypage</p>
        </Title>
        <ProfileImg
          // src={res?.data.myprofile.profileImage ? S3 : defaultUserImage}
          src={defaultUserImage}
          alt="profileImg"
        />
        <ProfileDetailBox>
          <PointWrap>
            <p>닉네임</p>
            <PointBox>
              {profileData?.data.myprofile.nickname}
              닉네임
            </PointBox>
          </PointWrap>
          <IntroBox>
            <p>자기소개</p>
            <Intro>
              {/* <p>{res?.data.myprofile.introduction}</p> */}
              자기소개
            </Intro>
          </IntroBox>
        </ProfileDetailBox>
        <ProfileButton
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          마이페이지 수정
        </ProfileButton>
        <DeleteAccountButton>
          {isDeleted ? (
            <p>회원 탈퇴가 완료되었습니다.</p>
          ) : (
            <>
              <p>회원 탈퇴하시겠습니까?</p>
              <button onClick={deleteUser}>회원 탈퇴</button>
            </>
          )}
        </DeleteAccountButton>

        <ul>
          {meetingData?.data.map((meeting: Meeting) => (
            <li key={meeting.id}>{meeting.title}</li>
          ))}
        </ul>
      </ProfileBox>

      {isModalOpen ? (
        <MyProfileModal
          open={isModalOpen}
          close={closeModal}
          profileImage={S3}
          // introduction={res?.data.myprofile.introduction}
          // nickname={res?.data.myprofile.nickname}
          introduction={"몰라"}
          nickname={"오리"}
        />
      ) : null}
    </MyProfileContainer>
  );
};

const MyProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 386px;
  margin: 160px auto;
`;

const Title = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  border-bottom: solid 1px #acacac;
  margin: 0 auto 32px auto;
  padding-bottom: 25px;
  > h2 {
    font-size: 30px;
    font-weight: 400;
    line-height: 45px;
  }
  > p {
    font-size: 20px;
    font-weight: 300;
    line-height: 30px;
  }
`;

const ProfileImg = styled.img`
  width: 154px;
  height: 154px;
  border-radius: 154px;
  display: block;
  margin: 0px auto 24px auto;
  cursor: default;
`;

const ProfileDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const PointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
`;

const PointBox = styled.div`
  background-color: white;
  width: 272px;
  height: 50px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #acacac;
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
`;

const Intro = styled.div`
  background-color: white;
  height: 102px;
  padding: 10px;
  margin-top: 8px;
  border-bottom: solid 1px #acacac;
`;

const ProfileButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  color: white;
  border: 1px solid #e5e2db;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  text-align: center;
  margin-top: 32px;
`;

const DeleteAccountButton = styled.button``;

export default UserPage;
