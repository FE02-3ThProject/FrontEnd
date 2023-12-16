import { useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import MyProfileModal from "../../components/user/MyProfileModal";
import styled from "styled-components";
import defaultUserImage from "../../images/default_profile.png";
import { deleteCookie, getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/loading/Loading";

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

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
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const S3 = "https://www.snsboom.co.kr/common/img/default_profile.png";

  return (
    <StMyProfileContainer>
      <StProfileBox>
        <StTitle>
          <h2>마이페이지</h2>
          <p>Mypage</p>
        </StTitle>
        <StProfileImg
          src={
            profileData?.data.image === null
              ? defaultUserImage
              : profileData?.data.image
          }
          alt="profileImg"
        />
        <StProfileDetailBox>
          <StPointWrap>
            <p>닉네임</p>
            <StPointBox>
              {profileData?.data.nickname}
              닉네임
            </StPointBox>
          </StPointWrap>
          <StPointWrap>
            <p>지역</p>
            <StPointBox>
              {profileData?.data.locationId.name}
              지역
            </StPointBox>
          </StPointWrap>
          <StPointWrap>
            <p>카테고리</p>
            <StPointBox>
              {/* {profileData?.data.categoryId.name} */}
              카테고리
            </StPointBox>
          </StPointWrap>
          <StIntroBox>
            <p>자기소개</p>
            <StIntro>
              {profileData?.data.introduction}
              자기소개
            </StIntro>
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
      </StProfileBox>

      {isModalOpen ? (
        <MyProfileModal
          open={isModalOpen}
          close={closeModal}
          profileImage={S3}
          // introduction={profileData?.data.introduction}
          introduction={"몰루"}
          nickname={profileData?.data.nickname}
          category={profileData?.data.categoryId.categoryId}
          location={profileData?.data.locationId.locationId}
        />
      ) : null}
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
  width: 386px;
  margin: 160px auto;
`;

const StTitle = styled.div`
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

const StProfileImg = styled.img`
  width: 154px;
  height: 154px;
  border-radius: 154px;
  display: block;
  margin: 0px auto 24px auto;
  cursor: default;
`;

const StProfileDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const StPointWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
`;

const StPointBox = styled.div`
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

const StIntroBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
`;

const StIntro = styled.div`
  background-color: white;
  height: 102px;
  padding: 10px;
  margin-top: 8px;
  border-bottom: solid 1px #acacac;
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
