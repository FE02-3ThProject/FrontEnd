import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UseInput from "../../hooks/UseInput";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import styled from "styled-components";

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
    <LoginContainer>
      <LoginBox>
        <Title>
          <h2>로그인</h2>
          <p>Login</p>
        </Title>
        <InputBox>
          <Input2
            type="email"
            placeholder="이메일"
            value={email || ""}
            onChange={setEmail}
          />
          <Input2
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
        </InputBox>

        <LoginButton onClick={() => onsubmit()}>로그인하기</LoginButton>
      </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBox = styled.div`
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

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const Input2 = styled.input`
  width: 372px;
  padding-left: 10px;
  height: 50px;
  font-size: 15px;
  margin-top: 5px;
  margin-left: 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  &:focus {
    border: 1px solid #1981f9;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #3085d6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  margin-top: 25px;
  font-family: "Gmarket Sans Light";
`;

export default LoginPage;
