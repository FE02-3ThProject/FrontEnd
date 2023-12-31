import { Link, useNavigate } from "react-router-dom";
// import MenuItem from "./MenuItem";
import styled from "styled-components";
import StButton from "../common/Button";
import { deleteCookie, getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import { useMutation, useQueryClient } from "react-query";

import { useRecoilState } from "recoil";
import { cookieState, profileImageState } from "../../Atoms";

import defaultUserImage from "../../images/default_profile.png";
import home from "../../images/Home.png";
import account from "../../images/Account box.png";
import create from "../../images/Edit.png";
import exit from "../../images/Exit to app.png";

const NavItem = () => {
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);
  const [isReCookie, setReCookie] = useRecoilState(cookieState);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userId = getCookie("email");
  const nickname = getCookie("nickname");

  const Logout = async () => {
    try {
      await apiToken.post("/api/user/logout");
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: `로그 아웃 도중 오류가 발생하였습니다!`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }
  };

  const { mutate: onLogout } = useMutation(Logout, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      deleteCookie("token");
      deleteCookie("nickname");
      deleteCookie("email");
      deleteCookie("profileimage");
      deleteCookie("location");
      deleteCookie("userRole");
      setReCookie(false);
      localStorage.removeItem("profileImage");

      Swal.fire({
        icon: "success",
        text: `로그 아웃 하셨습니다!`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/");
      });
    },
    onError: () => {
      Swal.fire({
        text: "로그 아웃에 실패 하셨습니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    },
  });

  //드롭다운 메뉴
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggling = () => setIsOpen(!isOpen);
  const el = useRef<HTMLDivElement>(null);

  const handleCloseToggling = (e: MouseEvent) => {
    if (el.current && !el.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleCloseToggling);
    return () => {
      window.removeEventListener("click", handleCloseToggling);
    };
  }, [el]);

  useEffect(() => {
    const cookie = getCookie("token");
    if (cookie !== undefined || null) {
      setReCookie(true);
    } else {
      setReCookie(false);
    }
  }, []);
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  return (
    <StMenuList>
      {isReCookie ? (
        <>
          <StDropDownContainer ref={el}>
            <StProfileImgBox
              src={profileImage === null ? defaultUserImage : profileImage}
              onClick={toggling}
            />
            {isOpen && (
              <StDropDownListContainer>
                <StDropDownList>
                  <StListItem
                    onClick={() => {
                      navigate(`mymeeting/${userId}`);
                      setIsOpen(false);
                    }}
                  >
                    <img className="icon" src={home} alt="icon" />
                    <div className="text">개설한모임</div>
                  </StListItem>
                  <StListItem
                    onClick={() => {
                      navigate(`/additional`);
                      setIsOpen(false);
                    }}
                  >
                    <img className="icon" src={create} alt="icon" />
                    <div className="text">모임생성</div>
                  </StListItem>
                  <StListItem
                    onClick={() => {
                      navigate(`/mypage/${userId}`);
                      setIsOpen(false);
                    }}
                  >
                    <img className="icon" src={account} alt="icon" />
                    <div className="text">회원정보</div>
                  </StListItem>
                  <StListItem
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                  >
                    <img className="icon" src={exit} alt="icon" />
                    <div className="text">로그아웃</div>
                  </StListItem>
                </StDropDownList>
              </StDropDownListContainer>
            )}
          </StDropDownContainer>
          <StNickBox>{nickname}</StNickBox>
        </>
      ) : (
        <>
          <Link to="login" style={{ textDecoration: "none", color: "white" }}>
            <StButton label="login" />
          </Link>
        </>
      )}
    </StMenuList>
  );
};

export default NavItem;

const StMenuList = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  /* width: 24vw; */
  margin: 0 2rem 0 0;
  gap: 1rem;
`;

const StProfileImgBox = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  cursor: pointer;
  border: 1px solid #d9d9d9;
`;

const StDropDownContainer = styled.div`
  width: 45px;
`;

const StDropDownListContainer = styled.div`
  margin-right: 40px;
`;

const StDropDownList = styled.ul`
  position: absolute;
  width: 145px;
  z-index: 3;
  padding: 0;
  /* margin: 0; */
  padding: 5px;
  background: #fffdf7;
  outline: 1px solid #a7aca1;
  border: 1px solid #a7aca1;
  box-sizing: border-box;
  color: #333;
  font-size: 1.2rem;
  font-weight: 400;
  transform: skew(-0.1deg);

  &:first-child {
    padding-top: 0.8em;
  }
`;

const StListItem = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 0.5em;
  cursor: pointer;

  .icon {
    width: 24px;
    height: 24px;
  }
  .text {
    transform: skew(-0.1deg);
  }
`;

const StNickBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 14px;
  color: black;
  padding: 10px;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
