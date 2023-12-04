import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UseInput from "../../hooks/UseInput";
import { api } from "../../shared/apis/Apis";
import { setCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

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
      setCookie("blogId", data.data.blogId, 2);
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

  return <div>LoginPage</div>;
};

export default LoginPage;
