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

let isRefreshing = false; 
let refreshSubscribers: ((token: string) => void)[] = []; 

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback); 
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.map((callback) => callback(token)); 
  refreshSubscribers = []; 
};

apiToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<unknown>) => {
    if (error.response?.status === 304) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        return axios
          .get("/api/newToken", {
            headers: {
              "X-AUTH-TOKEN": getCookie("token"), // 이전에 저장한 토큰을 헤더에 포함합니다.
            },
          })
          .then((response) => {
            const newToken = response.data.token;

            setCookie("token", newToken);

            onTokenRefreshed(newToken); // 토큰이 재발급되었음을 알립니다.

            // 재발급된 토큰을 originalRequest의 헤더에 설정합니다.
            if (
              originalRequest &&
              typeof originalRequest.headers === "object"
            ) {
              originalRequest.headers["X-AUTH-TOKEN"] = newToken;
            }

            // 원래 요청을 다시 보냅니다.
            if (originalRequest && typeof originalRequest === "object") {
              return axios(originalRequest);
            } else {
              throw new Error(
                "원래 요청을 다시 보내는 중 오류가 발생했습니다."
              );
            }
          })
          .catch((error) => {
            alert("토큰 재발급에 실패했습니다.");
            return Promise.reject(error); 
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 토큰 재발급이 진행 중일 때, 새로운 요청을 대기열에 추가합니다.
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            if (
              originalRequest &&
              typeof originalRequest.headers === "object"
            ) {
              originalRequest.headers["X-AUTH-TOKEN"] = token;
            }
            if (originalRequest && typeof originalRequest === "object") {
              resolve(axios(originalRequest));
            } else {
              throw new Error(
                "새로운 요청을 대기열에 추가하는 중 오류가 발생했습니다."
              );
            }
          });
        });
      }
    } else {
      alert("apiToken 에러입니다.");
      return Promise.reject(error); 
    }
  }
);
