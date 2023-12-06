import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UseInput from "../../hooks/UseInput";
import { emailCheck, nicknameCheck } from "../../shared/SignUpCheck";
import { api } from "../../shared/apis/Apis";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

const SignUpPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = UseInput("");
  const [nickname, setNickname] = UseInput("");
  const [password, setPassword] = UseInput("");
  const [confirmPassword, setConfirmPassword] = UseInput("");

  const [emailCHK, setEmailCHK] = useState(false);
  const [nicknameCHK, setNicknameCHK] = useState(false);

  //이메일 중복체크
  const postDupEmail = async (
    email: string | number
  ): Promise<AxiosResponse | null> => {
    if (!emailCheck(email)) {
      return null;
    } else {
      const data: AxiosResponse = await api.post("api주소", {
        email: String(email),
      });
      return data;
    }
  };

  const { mutate: checkEmail } = useMutation(postDupEmail, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        Swal.fire({
          text: "이메일 형식을 확인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else {
        setEmailCHK(true);
      }
    },
    onError: () => {
      setEmailCHK(false);
    },
  });

  //닉네임 중복체크
  const postDupNick = async (
    nickname: string | number
  ): Promise<AxiosResponse | null> => {
    if (!nicknameCheck(nickname)) {
      return null;
    } else {
      const data: AxiosResponse = await api.post("api주소", {
        nickname: String(nickname),
      });
      return data;
    }
  };

  const { mutate: dupNick } = useMutation(postDupNick, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data === null) {
        Swal.fire({
          text: "닉네임 형식을 확인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      } else {
        setNicknameCHK(true);
      }
    },
    onError: () => {
      setNicknameCHK(false);
    },
  });

  //회원가입
  const postSignUp = async () => {
    //공백일 시
    if (
      email === "" ||
      nickname === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Swal.fire({
        text: "이메일, 닉네임, 블로그아이디, 비밀번호를 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return Promise.reject();
    }
    //비밀번호 일치
    if (password !== confirmPassword) {
      Swal.fire({
        text: "비밀번호가 일치하지 않습니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return Promise.reject();
    }

    const data = await api.post("api주소", {
      email,
      nickname,
      password,
      confirmPassword,
    });
    return data;
  };

  const { mutate: onsubmit } = useMutation(postSignUp, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data?.data.result === true) {
        Swal.fire({
          text: "가입이 완료되었습니다.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        navigate("/login");
      } else {
        Swal.fire({
          text: "중복된 값이 있습니다.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
      }
    },
    onError: () => {
      Swal.fire({
        text: "블로그아이디, 닉네임, 비밀번호를 모두 기입해주세요.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return Promise.reject();
    },
  });

  return (
    <SignUpContainer>
      <SignUpBox>
        <Title>
          <h2>회원가입</h2>
          <p>Sign Up</p>
        </Title>

        <InputBox>
          <Input1
            type="email"
            id="email"
            placeholder="이메일 : "
            value={email || ""}
            onChange={setEmail}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                checkEmail(e.currentTarget.value);
              }
            }}
          />
          {email === "" ? null : emailCHK ? (
            <p style={{ color: "green" }}>사용가능한 이메일입니다.</p>
          ) : (
            <p style={{ color: "red" }}>
              이미 중복된 닉네임이거나, 사용불가능한 이메일입니다.
            </p>
          )}
          <Input2
            type="text"
            placeholder="닉네임 :               (영어/한글/숫자 3~15자)"
            value={nickname || ""}
            onChange={setNickname}
            onBlur={(e) => {
              if (e.currentTarget.value && e.currentTarget === e.target) {
                dupNick(e.currentTarget.value);
              }
            }}
          />
          {nickname === "" ? null : nicknameCHK ? (
            <p style={{ color: "green" }}>사용가능한 닉네임입니다.</p>
          ) : (
            <p style={{ color: "red" }}>
              이미 중복된 닉네임이거나, 사용불가능한 닉네임입니다.
            </p>
          )}
          <Input2
            type="password"
            value={password || ""}
            placeholder="비밀번호 :           (영어/숫자/특수문자 8자 이상)"
            onChange={setPassword}
          />
          <Input2
            type="password"
            value={confirmPassword || ""}
            placeholder="비밀번호 확인 :"
            onChange={setConfirmPassword}
          />
          {confirmPassword === null ? null : password === confirmPassword ? (
            <p style={{ color: "#1981f9" }}>비밀번호가 일치합니다.</p>
          ) : (
            <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
          )}
        </InputBox>

        <SignUpButton onClick={() => onsubmit()}>회원가입</SignUpButton>
      </SignUpBox>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpBox = styled.div`
  width: 20%;
  height: 100%;
  margin: 160px auto;
`;

const Title = styled.div`
  /* display: flex;
  text-align: center;
  flex-direction: column;
  border-bottom: solid 1px #acacac; */
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  border-bottom: solid 1px #acacac;
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

const Input1 = styled.input`
  /* width: 100%;
  height: 50px; */
  width: 415px;
  padding-left: 10px;
  height: 50px;
  font-size: 15px;
  margin-top: 20px;
  margin-left: 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  &:focus {
    border: 1px solid #1981f9;
  }
`;

const Input2 = styled.input`
  /* width: 100%;
  height: 50px;
  border-bottom: solid 1px #acacac; */
  width: 415px;
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

const SignUpButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #3085d6;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  margin-top: 25px;
`;

export default SignUpPage;
