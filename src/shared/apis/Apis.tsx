import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "../Cookie";

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
    return Promise.reject(error); 
  }
);


/* token 만료시 재발급 */
let retryCount = 0;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (retryCount >= 3) { // 재시도 횟수가 3회 이상이면 에러를 반환합니다.
        return Promise.reject(new Error("Token refresh failed after 3 attempts"));
      }
      retryCount += 1;
      try {
        const response = await api.get("/api/newToken", {
          headers: {
            "X-AUTH-TOKEN": getCookie("refreshToken"),
          },
        });
        const newToken = response.headers["New-Access-Token"];
        if (newToken) {
          setCookie("token", newToken, 24);
        }
        if (error.config) {
          error.config.headers["X-AUTH-TOKEN"] = newToken;
          return api.request(error.config);
        } else {
          throw new Error("Failed to retry request: config is undefined");
        }
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);