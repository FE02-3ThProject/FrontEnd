import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./components/layout/LayOut";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MeetingCreate from "./pages/MeetingCreatePage/MeetingCreate";
import MeetingPage from "./pages/MeetingRoom/MeetingRoom";
import ChatingRoom from "./pages/ChatingRoom/ChatingRoom";
import MeetingDetail from "./pages/MeetingDetail/MeetingDetail";
import UserPage from "./pages/UserPage/UserPage";
import ModificationPage from "./pages/ModificationPage/ModificationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} /> {/* 로그인 */}
          <Route path="signup" element={<SignUpPage />} /> {/* 회원가입 */}
          <Route path="additional" element={<MeetingCreate />} />
          {/* 모임생성 */}
          <Route path="meeting/:id" element={<MeetingPage />} /> {/* 모임방 */}
          <Route path="chating/:roomId" element={<ChatingRoom />} />
          {/* 채팅방 */}
          <Route path="meeting/:roomId" element={<MeetingDetail />} />
          {/* 모임 개시판 */}
          <Route path="mypage/:id" element={<UserPage />} /> {/* 마이페이지 */}
          <Route
            path="mypage/:id/modification"
            element={<ModificationPage />}
          />
          {/* 개인정보 수정 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
