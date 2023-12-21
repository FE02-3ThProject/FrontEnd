import { useEffect, useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import MyProfileModal from "../../components/user/MyProfileModal";
import styled from "styled-components";
import defaultUserImage from "../../images/default_profile.png";
import { deleteCookie, getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

import Loading from "../../components/loading/Loading";

import bgImg from "../../images/meeting/Group-559.png";
import profileBG from "../../images/userInfo/Group_556.png";
import userIcon from "../../images/userInfo/nickName.png";
import categoryIcon from "../../images/userInfo/category.png";
import locationIcon from "../../images/userInfo/location.png";
import productionIcon from "../../images/userInfo/production.png";
import modificationIcon from "../../images/userInfo/image 20.png";
import SubMeeting from "../../components/user/SubMeeting";
import JoindeMeeting from "../../components/user/JoinedMeeting";
import Swal from "sweetalert2";

interface MeetingType {
  id: string;
  title: string;
  content: string;
  createAt: string;
}

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("none");

  const navigator = useNavigate();

  const email = getCookie("email");

  //회원탈퇴
  const deleteUser = async () => {
    try {
      Swal.fire({
        title: "정말 회원 탈퇴를 하시겠습니까?",
        text: "확인후에는 되돌릴 수 없습니다!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "탈퇴",
        cancelButtonText: "취소",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await apiToken.delete("/api/user/userDelete");
          deleteCookie("token");
          deleteCookie("nickname");
          deleteCookie("email");
          deleteCookie("profileimage");
          deleteCookie("location");
          deleteCookie("userRole");
          Swal.fire({
            title: "삭제 되었습니다!",
            text: "당신의 계정이 정상적으로 삭제 되었습니다.",
            icon: "success",
          });
          return response;
          navigator("/");
        }
      });
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
    }
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  //가입&즐찾 모임 열기
  const SubMeetingView = () => {
    if (activeView === "sub") {
      setActiveView("none");
    } else {
      setActiveView("sub");
    }
  };
  const JoinMeetingView = () => {
    if (activeView === "join") {
      setActiveView("none");
    } else {
      setActiveView("join");
    }
  };

  const getMyJoinedMeeting = async () => {
    const res = await apiToken.get("/api/user/joined");
    return res;
  };
  const { data: joinedMeetingData } = useQuery<AxiosResponse<MeetingType[]>>(
    "MY_JOINEDMEETING",
    getMyJoinedMeeting
  );
  console.log(joinedMeetingData);

  const getSubMeeting = async () => {
    const res = await apiToken.get("/api/user/bookmarked");
    return res;
  };
  const { data: subMeetingData } = useQuery<AxiosResponse<MeetingType[]>>(
    "MY_SUBMEETING",
    getSubMeeting
  );
  console.log(subMeetingData);

  const getMyProfile = async () => {
    const res = await apiToken.get(`/api/user/info?email=${email}`);
    return res;
  };
  const { data: profileData, isLoading: profileLoading } = useQuery(
    "MY_PROFILE",
    getMyProfile
  );
  console.log(profileData);

  useEffect(() => {}, [profileData]);

  if (profileLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
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
                profileData?.data.image === null
                  ? defaultUserImage
                  : profileData?.data.image
              }
              alt="profileImg"
            />
          </StProfileImgBG>
          <StTextBox>
            <StProfileDetailBox>
              <StPointWrap>
                <img src={userIcon} />
                <StPointBox>{profileData?.data.nickname}</StPointBox>
              </StPointWrap>
              <StPointWrap>
                <img src={locationIcon} />
                <StPointBox>{profileData?.data.locationId.name}</StPointBox>
              </StPointWrap>
              <StPointWrap>
                <img src={categoryIcon} />
                <StPointBox>{profileData?.data.categoryId.name}</StPointBox>
              </StPointWrap>
              <StIntroBox>
                <img src={productionIcon} />
                <StIntro>{profileData?.data.introduction}</StIntro>
              </StIntroBox>
            </StProfileDetailBox>
            <StButtonBox>
              <StDeleteAccountButton onClick={deleteUser}>
                회원 탈퇴
              </StDeleteAccountButton>
              <StProfileButton
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <img src={modificationIcon} />
                마이페이지 수정
              </StProfileButton>
            </StButtonBox>
          </StTextBox>
        </StUser>
        <StVisibleWrap>
          <StButtonWrap>
            <StToggleButton onClick={JoinMeetingView}>
              가입한모임
            </StToggleButton>
            <StToggleButton onClick={SubMeetingView}>즐겨찾기</StToggleButton>
          </StButtonWrap>
          <StToggleWrap>
            <StToggleCard>
              {activeView === "join" &&
                joinedMeetingData?.data.map((data) => (
                  <JoindeMeeting key={data.id} data={data} />
                ))}
            </StToggleCard>
            {activeView === "sub" &&
              subMeetingData?.data.map((data) => (
                <SubMeeting key={data.id} data={data} />
              ))}
          </StToggleWrap>
        </StVisibleWrap>
      </StProfileBox>

      {isModalOpen ? (
        <MyProfileModal
          open={isModalOpen}
          close={closeModal}
          introduction={profileData?.data.introduction}
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
  border: 1px solie red;
  background-image: url(${bgImg});
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
`;

const StProfileBox = styled.div`
  display: flex;
  width: 1096px;
  min-height: 731px;
  align-items: center;
  margin: 68px auto;
  flex-direction: column;
  border-radius: 30px;
  border: 1px solid white;
  background-color: white;
  box-shadow: 11px 13px 4px 0px #0000001a;
`;

const StUser = styled.div`
  display: flex;
`;

const StTextBox = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  margin-top: 55px;
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 78px;
  border-bottom: solid 1px #d9d9d9;
  > h2 {
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    text-align: center;
    color: black;
  }
`;

const StProfileImgBG = styled.div`
  width: 610px;
  height: 560px;
  background-image: url(${profileBG});
  background-size: cover;
  background-position: center;
`;

const StProfileImg = styled.img`
  width: 337px;
  height: 337px;
  border-radius: 337px;
  display: block;
  margin: 62px auto 161px 119px;
  cursor: pointer;
`;

const StProfileDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
`;

const StPointWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 17px;
  > img {
    width: 25px;
    height: 25px;
  }
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
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 4px 0px #00000040;
  color: black;
`;

const StIntroBox = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
  gap: 17px;
  > img {
    width: 25px;
    height: 25px;
    margin-top: 22px;
  }
`;

const StIntro = styled.div`
  width: 360px;
  height: 185px;
  padding: 10px;
  margin-top: 22px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const StProfileButton = styled.button`
  width: 169px;
  height: 43px;
  background-color: #767676;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  gap: 8px;

  > img {
    width: 18px;
    height: 18px;
  }
`;

const StVisibleWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid purple;
  justify-content: center;
`;

const StButtonWrap = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const StToggleWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

const StToggleButton = styled.button`
  width: 250px;
  height: 80px;
  display: flex;
  margin-bottom: 26px;
  font-size: 32px;
  font-weight: 700;
`;

const StToggleCard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StButtonBox = styled.div`
  display: flex;
  margin-top: 22px;
  margin-left: 70px;
  gap: 16px;
`;

const StDeleteAccountButton = styled.button`
  width: 169px;
  height: 43px;
  background-color: #767676;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

export default UserPage;
