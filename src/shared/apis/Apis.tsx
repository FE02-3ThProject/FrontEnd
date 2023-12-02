import axios, { AxiosError } from "axios";
import { getCookie } from "../Cookie";

/* 기본 api */
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

/* token이 들어간 api */
export const apiToken = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

apiToken.interceptors.request.use(
  (config) => {
    const authToken = getCookie("token");
    config.headers["X-AUTH-TOKEN"] = authToken;
    return config;
  },
  (error: AxiosError<unknown>) => {
    alert("apiToken 에러입니다.");
    return Promise.reject(error); // 에러를 재전파하여 다른 핸들러에서도 처리할 수 있도록 함
  }
);