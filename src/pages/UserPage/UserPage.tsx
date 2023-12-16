import { useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import MyProfileModal from "../../components/user/MyProfileModal";
import styled from "styled-components";
import defaultUserImage from "../../images/default_profile.png";
import { deleteCookie, getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/loading/Loading";

import profileBG from "../../images/Group_556.png";

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false)

  const navigator = useNavigate();

  const email = getCookie("email");

  const deleteUser = async () => {
    try {
      const response = await apiToken.delete("/api/user/userDelete");
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
    }
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const meetingView = () => {
    setIsVisible(!isVisible)
  }

  const getMyProfile = async () => {
    const res = await apiToken.get(`/api/user/info?email=${email}`);
    return res;
  };
  const { data: profileData, isLoading: profileLoading } = useQuery(
    "MY_PROFILE",
    getMyProfile
  );
  console.log(profileData);
  if (profileLoading) {
    return Loading;
  }

  return (
    <StMyProfileContainer>
      <StProfileBox>
        <StTitle>
          <h2>My page</h2>
        </StTitle>
        <StUser>
          <StProfileImgBG>
            <StProfileImg
              src={
                // profileData?.data.image === null
                //   ? defaultUserImage
                //   : profileData?.data.image
                defaultUserImage
              }
              alt="profileImg"
            />
          </StProfileImgBG>        
          <StTextBox>
            <StProfileDetailBox>
              <StPointWrap>
                <StPointBox>{profileData?.data.nickname}</StPointBox>
              </StPointWrap>
              <StPointWrap>
                <StPointBox>{profileData?.data.locationId.name}</StPointBox>
              </StPointWrap>
              <StPointWrap>
                <StPointBox>{profileData?.data.categoryId.name}</StPointBox>
              </StPointWrap>
              <StIntroBox>
                <StIntro>{profileData?.data.introduction}</StIntro>
              </StIntroBox>
            </StProfileDetailBox>
            <StProfileButton
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              마이페이지 수정
            </StProfileButton>
            <StOpenJoinde>
              <button
                onClick={() => {
                  navigator("/joind/meeting");
                }}
              >
                내가 가입한 모임 열기
              </button>
            </StOpenJoinde>
            <StDeleteAccountButton>
              {isDeleted ? (
                <p>회원 탈퇴가 완료되었습니다.</p>
              ) : (
                <>
                  <p>회원 탈퇴하시겠습니까?</p>
                  <button onClick={deleteUser}>회원 탈퇴</button>
                </>
              )}
            </StDeleteAccountButton>
          </StTextBox>
        </StUser>
      </StProfileBox>

      {isModalOpen ? (
        <MyProfileModal
          open={isModalOpen}
          close={closeModal}
          profileImage={profileData?.data.image}
          introduction={profileData?.data.introduction}
          nickname={profileData?.data.nickname}
          category={profileData?.data.categoryId.categoryId}
          location={profileData?.data.locationId.locationId}
          userId={profileData?.data.userId}
        />
      ) : null}

      <div>
        <button onClick={meetingView}>togle</button>
        {isVisible && <div>가입모임</div>}
      </div>
    </StMyProfileContainer>
  );
};

const StMyProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StProfileBox = styled.div`
  width: 1096px;
  height: 731px;
  margin: 68px auto;
  flex-direction: column;
  border: 1px solid white;
`;

const StUser = styled.div`
  display: flex;
  border: 1px solid red;
`;

const StTextBox = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  margin-top: 55px;
  border: 1px solid green;
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 78px;
  border-bottom: solid 1px #acacac;
  > h2 {
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    text-align: center;
  }
`;

const StProfileImgBG = styled.div`
  width: 610px;
  height: 560px;
  background-image: url(${profileBG});
  background-size: cover;
  background-position: center;
  border: 1px solid yellow;
`;

const StProfileImg = styled.img`
  width: 337px;
  height: 337px;
  border-radius: 337px;
  display: block;
  margin: 62px auto 161px 119px;
  cursor: pointer;
  border: 1px solid purple;
`;

const StProfileDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
`;

const StPointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const StPointBox = styled.div`
  width: 360px;
  height: 43px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
  display: flex;
  align-items: center;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 4px 4px 0px #f9b93790;
  color: black;
`;

const StIntroBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
`;

const StIntro = styled.div`
width: 360px;
  height: 185px;
  padding: 10px;
  margin-top: 22px;
  border: 1px solid #D9D9D9;
  box-shadow: 0px 4px 4px 0px #f9b93790;
`;

const StProfileButton = styled.button`
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

const StDeleteAccountButton = styled.div``;

const StOpenJoinde = styled.div``;

export default UserPage;
