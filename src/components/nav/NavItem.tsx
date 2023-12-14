import { Link, useNavigate } from "react-router-dom";
// import MenuItem from "./MenuItem";
import styled from "styled-components";
import StButton from "../common/Button";
import { deleteCookie, getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import { useMutation, useQueryClient } from "react-query";

import defaultUserImage from "../../images/default_profile.png";
import home from "../../images/Home.png";
import account from "../../images/Account box.png";
import create from "../../images/Edit.png";
import exit from "../../images/Exit to app.png";

const NavItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const cookie = getCookie("token");
  const profileimage = getCookie("profileimage");
  const userId = getCookie("email");
  const [is_cookie, setCookie] = useState(false);

  const Logout = async () => {
    try {
      await apiToken.post("/api/user/logout");
    } catch (error) {
      console.error("logOut Error", error);
      throw error;
    }
  };

  const { mutate: onLogout } = useMutation(Logout, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      deleteCookie("token");
      deleteCookie("nickname");
      deleteCookie("userId");
      deleteCookie("email");
      deleteCookie("profileimage");
      deleteCookie("location");
      setCookie(false);

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
    if (cookie !== undefined) {
      return setCookie(true);
    }
  }, [cookie]);

  return (
    <StMenuList>
      {is_cookie ? (
        <>
          <StDropDownContainer ref={el}>
            <StProfileImgBox
              src={profileimage === null ? defaultUserImage : profileimage}
              onClick={toggling}
            />
            {isOpen && (
              <StDropDownListContainer>
                <StDropDownList>
                  <StListItem
                    onClick={() => {
                      navigate("joind/meeting");
                      setIsOpen(false);
                    }}
                  >
                    <img className="icon" src={home} alt="icon" />
                    <div className="text">가입한모임</div>
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
          <StNickBox>닉네임</StNickBox>
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
  width: 72px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
