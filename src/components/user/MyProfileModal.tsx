import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import { nicknameCheck } from "../../shared/SignUpCheck";
import { api, apiToken } from "../../shared/apis/Apis";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";

import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";

import Category from "../category/Category";
import Location from "../location/Location";

import { useRecoilState } from "recoil";
import { profileImageState } from "../../Atoms";

import chgImg from "../../images/chgImg.svg";
import defaultImg from "../../images/default_profile.png";
import profileBG from "../../images/userInfo/Group_556.png";
import userIcon from "../../images/userInfo/nickName.png";
import categoryIcon from "../../images/userInfo/category.png";
import locationIcon from "../../images/userInfo/location.png";
import productionIcon from "../../images/userInfo/production.png";

interface MyProfileModalProps {
  open: boolean;
  close: () => void;
  introduction: string;
  nickname: string;
  category: string;
  location: string;
}

const MyProfileModal: React.FC<MyProfileModalProps> = ({
  open,
  close,
  introduction,
  nickname,
  category,
  location,
}) => {
  const queryClient = useQueryClient();

  const [profileImage, setProfileImage] = useRecoilState(profileImageState);

  const [CHGintroduction, setCHGIntroduction] = useState<string>(introduction);
  const [CHGnickname, setCHGnickname] = useState<string>(nickname);
  const [confirmNick, setConfirmNick] = useState<boolean>(false);
  const [previewImg, setpreviewImg] = useState<string | null>(profileImage);
  const [CHGprofileImg, setCHGprofileImg] = useState<File | string | null>(
    profileImage
  );
  const [CHGlocation, setCHGlocation] = useState<string>(location);
  const [CHGcategory, setCHGcategory] = useState<string>(category);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const PreNickname = getCookie("nickname");

  //닉네임 중복체크
  const getNickCheck = async (): Promise<AxiosResponse | null> => {
    if (!nicknameCheck(CHGnickname)) {
      return null;
    } else {
      const data: AxiosResponse = await api.get(
        `/api/user/${CHGnickname}/existsNickname`
      );
      return data;
    }
  };
  const handleDupnickClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dupnick();
  };

  const { mutate: dupnick } = useMutation(getNickCheck, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
      if (data === null) {
        Swal.fire({
          text: "닉네임 형식을 지켜주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else if (data?.data === false) {
        Swal.fire({
          text: "닉네임 중복입니다.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        setConfirmNick(false);
      } else if (data?.data === true) {
        Swal.fire({
          text: "사용가능한 닉네임 입니다.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        setConfirmNick(true);
      }
    },
    onError: () => {
      Swal.fire({
        text: "닉네임 변경중 에러가 발생하였습니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      setConfirmNick(false);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCHGprofileImg(event.target.files[0]);
      encodeFileToBase64(event.target.files[0]).then((encodedImage) => {
        setpreviewImg(encodedImage);
      });
    }
  };

  //이미지 미리보기
  const encodeFileToBase64 = (fileBlob: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result?.toString() || "";
        setpreviewImg(result);
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(fileBlob);
    });
  };

  //프로필 변경
  const useProfile = async (): Promise<AxiosResponse | null> => {
    const formData = new FormData();
    formData.append("nickname", CHGnickname);
    formData.append("locationId", CHGlocation);
    formData.append("categoryId", CHGcategory);
    formData.append("introduction", CHGintroduction);
    if (typeof CHGprofileImg === "string") {
      const response = await fetch(CHGprofileImg);
      const blob = await response.blob();
      formData.append("image", blob);
    } else if (CHGprofileImg) {
      formData.append("image", CHGprofileImg);
    }

    const data = await apiToken.put("/api/user/info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  };
  const handleOnsubmitClick = () => {
    if (
      confirmNick &&
      CHGprofileImg &&
      CHGcategory &&
      CHGlocation &&
      CHGintroduction
    ) {
      onsubmit();
    } else {
      Swal.fire({
        text: "닉네임 중복 확인 및 모든 필드를 입력해주세요.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }
  };

  const { mutate: onsubmit } = useMutation(useProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
      deleteCookie("nickname");
      deleteCookie("profileimage");
      deleteCookie("location");
      deleteCookie("category");
      setCookie("nickname", CHGnickname);
      setCookie("location", CHGlocation);
      setCookie("category", CHGcategory);
      setCookie("profileimage", data?.data.image);
      setProfileImage(data?.data.image);
      Swal.fire({
        text: "변경이 완료되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      close();
    },
    onError: () => {
      Swal.fire({
        text: "error",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    },
  });

  //프로필 변경
  const useProfile1 = async (): Promise<AxiosResponse | null> => {
    const formData = new FormData();
    formData.append("introduction", CHGintroduction);
    formData.append("locationId", CHGlocation);
    formData.append("categoryId", CHGcategory);
    if (typeof CHGprofileImg === "string") {
      const response = await fetch(CHGprofileImg);
      const blob = await response.blob();
      formData.append("image", blob);
    } else if (CHGprofileImg) {
      formData.append("image", CHGprofileImg);
    }

    const data = await apiToken.put("/api/user/info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  };

  const handleOnsubmit1Click = () => {
    onsubmit1();
  };

  const { mutate: onsubmit1 } = useMutation(useProfile1, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      deleteCookie("profileimage");
      deleteCookie("location");
      deleteCookie("category");
      setCookie("location", CHGlocation);
      setCookie("category", CHGcategory);
      setCookie("profileimage", data?.data.image);
      setProfileImage(data?.data.image);
      Swal.fire({
        text: "변경이 완료되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      close();
    },
    onError: () => {
      Swal.fire({
        text: "error",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    },
  });

  // if (MyProfileModal.isLoading) {
  //   return null;
  // }

  //input창 숨기고 사진 넣기
  const onClickImageUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (CHGprofileImg !== undefined || null) {
      return setCookie("profileimage", defaultImg);
    }
  }, [CHGprofileImg]);

  return (
    <>
      <StModal className={open ? "openModal" : ""}>
        {open ? (
          <StModalSection>
            <StModalHeader>
              <h2>Modify Mypage</h2>
            </StModalHeader>

            <StModalMain>
              <StProfileImgBG>
                <StProfileImg
                  src={
                    previewImg && previewImg.split("/")[3] !== "null"
                      ? previewImg
                      : defaultImg
                  }
                  alt="profile"
                  onClick={onClickImageUpload}
                />
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept=".jpg, .jpeg, .png"
                  required
                  onChange={handleFileChange}
                />
                <StChgProfile onClick={onClickImageUpload}>
                  <img src={chgImg} alt="img" />
                </StChgProfile>
              </StProfileImgBG>

              <StModifyBox>
                <StProfileDetailBox>
                  <StWrap>
                    <img src={userIcon} />
                    <StInputWrap>
                      <input
                        defaultValue={nickname}
                        onChange={(e) => {
                          setCHGnickname(e.target.value);
                        }}
                      />
                      <StDupButton onClick={handleDupnickClick}>
                        중복 확인
                      </StDupButton>
                    </StInputWrap>
                  </StWrap>
                  <StPointWrap>
                    <img src={locationIcon} />
                    <StSellect>
                      <Location
                        width="360px"
                        height="43px"
                        fontSize="14px"
                        background-color="#333"
                        boxShadow="0px 4px 4px 0px #f9b93790"
                        value={CHGlocation}
                        onChange={(selectedValue) =>
                          setCHGlocation(selectedValue)
                        }
                      />
                    </StSellect>
                  </StPointWrap>
                  <StPointWrap>
                    <img src={categoryIcon} />
                    <Category
                      width="360px"
                      height="43px"
                      fontSize="14px"
                      background-color="#333"
                      boxShadow="0px 4px 4px 0px #f9b93790"
                      value={CHGcategory}
                      onChange={(selectedValue) =>
                        setCHGcategory(selectedValue)
                      }
                    />
                  </StPointWrap>
                  <StWrap2>
                    <img src={productionIcon} />
                    <StIntroTextBox
                      defaultValue={introduction}
                      onChange={(e) => {
                        setCHGIntroduction(e.target.value);
                      }}
                    />
                  </StWrap2>

                  <StModalFooter>
                    <StModalButton onClick={close}>취소하기</StModalButton>
                    {PreNickname === CHGnickname ? (
                      <StModalButton onClick={handleOnsubmit1Click}>
                        수정
                      </StModalButton>
                    ) : (
                      <StModalButton onClick={handleOnsubmitClick}>
                        수정
                      </StModalButton>
                    )}
                  </StModalFooter>
                </StProfileDetailBox>
              </StModifyBox>
            </StModalMain>
          </StModalSection>
        ) : null}
      </StModal>
    </>
  );
};

const modalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const modalBgShow = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StModal = styled.div`
  display: flex;
  align-items: center;
  animation: ${modalBgShow} 0.5s;
  position: fixed;
  top: -283px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const StModalSection = styled.section`
  animation: ${modalShow} 0.3s;
  display: flex;
  width: 1096px;
  min-height: 731px;
  align-items: center;
  margin: 0px auto;
  flex-direction: column;
  border-radius: 30px;
  border: 1px solid white;
  background-color: #090909;
  box-shadow: 11px 13px 4px 0px #0000001a;
`;

const StModalHeader = styled.div`
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
  }
`;

const StModalMain = styled.div`
  display: flex;
`;

const StModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 22px;
  margin-left: 10px;
  gap: 16px;
`;

const StModalButton = styled.button`
  width: 169px;
  height: 43px;
  background-color: #767676;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  margin-top: 41px;
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

const StChgProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  border: 1px solid gray;
  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;
  right: -60%;
  bottom: 200px;
  cursor: pointer;
  background-color: white;
`;

const StModifyBox = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  margin-top: 55px;
`;

const StWrap = styled.div`
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

const StInputWrap = styled.div`
  width: 360px;
  height: 43px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20.3px;
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 4px 0px #f9b93790;
  color: black;
  > input {
    width: 300px;
    height: 37px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20.3px;
    padding-left: 10px;
  }
`;

const StDupButton = styled.button`
  width: 60px;
  height: 43px;
  color: #767676;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  color: white;
`;

const StSellect = styled.div``;

const StPointWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 10px;
  > img {
    width: 25px;
    height: 25px;
  }
`;

const StWrap2 = styled.div`
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

const StIntroTextBox = styled.textarea`
  width: 360px;
  height: 185px;
  padding: 10px;
  margin-top: 22px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 4px 0px #f9b93790;
`;

export default MyProfileModal;
