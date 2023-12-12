import { Link, useNavigate } from "react-router-dom";
// import MenuItem from "./MenuItem";
import styled from "styled-components";
import StButton from "../common/Button";
import StButtonW from "../common/ButtonW";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { apiToken } from "../../shared/apis/Apis";
import { useMutation, useQueryClient } from "react-query";

const NavItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const cookie = getCookie("token");
  const [is_cookie, setCookie] = useState(false);

  const Logout = async() => {
    try {
      await apiToken.post("/api/user/logout");
    } catch (error) {
      console.error("logOut Error", error);
      throw error;
    }  
  };

  const { mutate: onLogout } = useMutation(Logout, {
    onSuccess: () =>{
      queryClient.invalidateQueries();
      deleteCookie("token");
      deleteCookie("nickname");
      deleteCookie("userId");
      deleteCookie("blogId");
      deleteCookie("profileimage");
      setCookie(false);

      Swal.fire({
        icon: "success",
        text: `로그 아웃 하셨습니다!`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/");

      })
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
  })

  useEffect(() => {
    if (cookie !== undefined) {
      return setCookie(true);
    }
  }, []);

  return (
    <StMenuList>
      {is_cookie ? (
        <>
          
          <StButtonW
          label="logout"
          onClick={() => {
            onLogout();
          }}
        />
        </>
      ) : (
        <>
        <Link to="login" style={{ textDecoration: "none", color: "white" }}>
            <StButton label="login" />
          </Link>
          <Link to="signup" style={{ textDecoration: "none", color: "white" }}>
            <StButtonW label="register" />
          </Link>
          <StButtonW
          label="logout"
          onClick={() => {
            onLogout();
          }}
          />
        </>
      )}

      {/* <Link to="mypage/:id" style={{ textDecoration: "none", color: "white" }}>
        <MenuItem label="Admin" />
      </Link>
      <Link
        to="chating/:roomId"
        style={{ textDecoration: "none", color: "white" }}
      >
        <MenuItem label="Chat" />
      </Link>
      <Link to="meeting/:id" style={{ textDecoration: "none", color: "white" }}>
        <MenuItem label="Meeting" />
      </Link>
      <Link to="login" style={{ textDecoration: "none", color: "white" }}>
        <MenuItem label="Login" />
      </Link> */}
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
