import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";

const clientId: string = import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID!;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // window focus 설정
      // refetchOnMount: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RecoilRoot>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
