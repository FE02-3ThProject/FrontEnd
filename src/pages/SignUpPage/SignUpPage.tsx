import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import UseInput from "../../hooks/UseInput";
import { emailCheck, nicknameCheck } from "../../shared/SignUpCheck";
import { api } from "../../shared/apis/Apis";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import Category from "../../components/category/Category";
import Location from "../../components/location/Location";

import LoginBg from "../../images/login_bg.png";
import MoMo from "../../images/other_logo2.png";

const SignUpPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = UseInput("");
  const [nickname, setNickname] = UseInput("");
  const [password, setPassword] = UseInput("");
  const [confirmPassword, setConfirmPassword] = UseInput("");

  const [emailCHK, setEmailCHK] = useState(false);
  const [nicknameCHK, setNicknameCHK] = useState(false);

  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");

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
      location,
      category,
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
        <FormContainer>
          <SignUpTap>
            <Title>Sign up</Title>
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
              {confirmPassword === null ? null : password ===
                confirmPassword ? (
                <p style={{ color: "#1981f9" }}>비밀번호가 일치합니다.</p>
              ) : (
                <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
              )}
            </InputBox>
          </SignUpTap>
          <SelectTap>
            <MoMoLogo />
            <InputBox2>
              <Location
                width="387px"
                height="61px"
                fontSize="18px"
                value={location}
                onChange={(selectedValue) => setLocation(selectedValue)}
              />
              <Category
                width="387px"
                height="61px"
                fontSize="18px"
                value={category}
                onChange={(selectedValue) => setCategory(selectedValue)}
              />
            </InputBox2>
          </SelectTap>
        </FormContainer>

        <SignUpButton onClick={() => onsubmit()}>회원가입</SignUpButton>
        <StLogin>
          Already have an account?
          <Link to="/login"> Login</Link>
        </StLogin>
      </SignUpBox>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  background-image: url(${LoginBg});
  background-size: cover;
  background-position: center;
`;

const SignUpBox = styled.div`
  width: 885px;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 20%;
  margin-top: 85px;
  margin-bottom: 85px;
  border-radius: 20px;
  background-color: rgba(10, 10, 10, 0.7);
`;

const FormContainer = styled.div`
  display: flex;
  gap: 31px;
`;
const SignUpTap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const SelectTap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 66px;
  gap: 32px;
`;

const MoMoLogo = styled.div`
  width: 251px;
  height: 194px;
  background-image: url(${MoMo});
  background-size: cover;
  background-position: center;
`;

const Title = styled.div`
  display: flex;
  margin-top: 55px;
  text-align: center;
  font-family: Inter;
  font-size: 44px;
  font-weight: 400;
  line-height: 53px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const InputBox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Input1 = styled.input`
  width: 387px;
  height: 61px;
  padding-left: 10px;
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
  width: 387px;
  height: 61px;
  padding-left: 10px;
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
  width: 95%;
  height: 65px;
  margin: 80px 0 10px 0;
  background-color: #ea2a2a;
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
`;

const StLogin = styled.div`
margin-bottom: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
`;

export default SignUpPage;
