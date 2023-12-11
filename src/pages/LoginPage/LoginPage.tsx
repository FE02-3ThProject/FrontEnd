import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import UseInput from "../../hooks/UseInput";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

import LoginBg from "../../images/login_bg.png";
import Naver from "../../images/naver.png";
import Kakao from "../../images/kakao.png";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = UseInput("");
  const [password, setPassword] = UseInput("");

  const postLogin = async () => {
    const data = await api.post("api주소", {
      email,
      password,
    });
    return data;
  };
  const { mutate: onsubmit } = useMutation(postLogin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setCookie("token", data.data.token, 2);
      setCookie("nickname", data.data.nickname, 2);
      setCookie("userId", data.data.userId, 2);
      setCookie("profileimage", data.data.profileImage, 2);

      navigate("/");
    },
    onError: () => {
      Swal.fire({
        text: "아아디, 비밀번호를 확인해주세요.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    },
  });

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
        <StSoCialTitle>Or login with</StSoCialTitle>
        <StSocailBtnBox>
          <StSocialLoginBtnKaKao />
          <StSocialLoginBtnGoogle />
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
`;

const StLoginBox = styled.div`
  width: 471px;
  height: 662px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 20%;
  margin-top: 85px;
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

const StSoCialTitle = styled.div`
  width: 159px;
  height: 31px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  margin: 20px;
`;

const StSocailBtnBox = styled.div`
  display: flex;
  gap: 51px;
`;

const StSocialLoginBtnKaKao = styled.button`
  background-image: url(${Kakao});
  width: 165px;
  height: 42px;
`;

const StSocialLoginBtnGoogle = styled.button`
  background-image: url(${Naver});
  width: 165px;
  height: 42px;
`;

const StSingup = styled.div`
  margin-top: 27px;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
`;

export default LoginPage;
