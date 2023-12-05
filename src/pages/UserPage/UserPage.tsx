import React, { useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import { useQuery } from "react-query";
import MyProfileModal from "../../components/user/MyProfileModal";
import styled from "styled-components";
import defaultUserImage from "../../../public/images/default_profile.png";

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  const getMyProfile = async () => {
    const res = await apiToken.get("/user/myprofile");
    return res;
  };
  const { data: res, status } = useQuery("MY_PROFILE", getMyProfile, {
    staleTime: 0,
    cacheTime: 0,
    onSuccess: (data) => {
      return data;
    },
  });

  if (status === "loading") {
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
              {/* <p>{res?.data.myprofile.nickname}</p> */}
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
      </ProfileBox>

      {isModalOpen === true ? (
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

export default UserPage;
