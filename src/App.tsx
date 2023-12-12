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
import PostPage from "./pages/PostPage/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="additional" element={<MeetingCreate />} />
          <Route path="meeting/:meetingId" element={<MeetingPage />} />{" "}
          <Route path="chating/:roomId" element={<ChatingRoom />} />
          <Route path="meeting/:roomId" element={<MeetingDetail />} />
          <Route path="mypage/:id" element={<UserPage />} />
          <Route
            path="meeting/:meetingId/:postId/modification"
            element={<ModificationPage />}
          />
          <Route path="meeting/:meetingId/:postId" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
