import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import UseInput from "../../hooks/UseInput";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { cookieState, profileImageState } from "../../Atoms";
import { userEmailState } from "../../Atoms";

import LoginBg from "../../images/login_bg.png";
// import Naver from "../../images/naver.png";

// import { useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";

const LoginPage = () => {
  const [, setProfileImage] = useRecoilState(profileImageState);
  const [, setUserEmail] = useRecoilState(userEmailState);
  const [, setReCookie] = useRecoilState(cookieState);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = UseInput("");
  const [password, setPassword] = UseInput("");

  const postLogin = async (): Promise<AxiosResponse | null> => {
    const data: AxiosResponse = await api.post("/api/user/login", {
      email,
      password,
    });
    return data;
  };
  const { mutate: onsubmit } = useMutation(postLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();

      const token = data?.headers.authorization.split(" ")[1];
      const refreshToken = data?.headers.refreshtoken;
      setCookie("token", token, 2);      
      setCookie("refreshToken", refreshToken, 2);
      setCookie("nickname", data?.data.nickname, 2);
      setCookie("email", data?.data.email, 2);
      setCookie("profileimage", data?.data.image, 2);
      setCookie("location", data?.data.location, 2);
      setCookie("userRole", data?.data.userRole, 2);
      setProfileImage(data?.data.image);
      setUserEmail(data?.data.email);
      setReCookie(true);
      localStorage.setItem("profileImage", data?.data.image);
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        Swal.fire({
          text: "아아디, 비밀번호를 확인해주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else if (
        axios.isAxiosError(error) &&
        error.message === "Network Error"
      ) {
        Swal.fire({
          text: "로그인중 네트워크 오류가 발생하였습니다. \n 잠시후 다시 시도해 주세요",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    },
  });

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (res) => {
  //     await api
  //       .post(
  //         "/oauth2/authorization/google",
  //         {},
  //         {
  //           headers: { Authorization: `Bearer ${res.access_token}` },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((e) => console.log(e));
  //   },
  // });

  return (
    <StLoginContainer>
      <StLoginBox>
        <StTitle>Welcome</StTitle>
        <StInputBox>
          <StInput2
            type="email"
            placeholder="이메일"
            value={email || ""}
            onChange={setEmail}
          />
          <StInput2
            type="password"
            value={password || ""}
            placeholder="비밀번호"
            onChange={setPassword}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onsubmit();
              }
            }}
          />
        </StInputBox>
        <StLoginButton onClick={() => onsubmit()}>Login</StLoginButton>
        {/* <StSoCialTitle>Login with Google</StSoCialTitle> */}
        <StSocailBtnBox>
          {/* <StSocialLoginBtnGoogle onClick={() => googleLogin()} /> */}
        </StSocailBtnBox>
        <StSingup>
          Don’t have account?
          <Link to="/signup"> Sign up Now</Link>
        </StSingup>
      </StLoginBox>
    </StLoginContainer>
  );
};

const StLoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  background-image: url(${LoginBg});
  background-size: cover;
  background-position: center;
  color: #fff;
`;

const StLoginBox = styled.div`
  width: 471px;
  height: 662px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 85px 0 85px 20%;
  border-radius: 20px;
  background-color: #0a0a0a;
  background-color: rgba(10, 10, 10, 0.7);
`;

const StTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 76px 0 53px 0;
  font-weight: 400;
  font-size: 44px;
`;

const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  border-radius: 5px;
`;

const StInput2 = styled.input`
  width: 366px;
  height: 61px;
  padding-left: 14px;
  font-size: 18px;
  margin-top: 5px;
  margin-left: 0;
  &:focus {
    border: 1px solid red;
  }
  border-radius: 5px;
  background-color: #3b3b3b;
`;

const StLoginButton = styled.button`
  width: 384px;
  height: 65px;
  background-color: #ea2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 46px;
`;

// const StSoCialTitle = styled.div`
//   width: 159px;
//   height: 31px;
//   font-size: 18px;
//   font-weight: 400;
//   text-align: center;
//   margin: 20px;
// `;

const StSocailBtnBox = styled.div`
  display: flex;
  gap: 51px;
`;

// const StSocialLoginBtnGoogle = styled.button`
//   background-image: url(${Naver});
//   width: 165px;
//   height: 42px;
// `;

const StSingup = styled.div`
  margin-top: 27px;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
`;

export default LoginPage;
