import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./components/layout/LayOut";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MeetingCreate from "./pages/MeetingCreatePage/MeetingCreate";
import ChatingRoom from "./pages/ChatingRoom/ChatingRoom";
import UserPage from "./pages/UserPage/UserPage";
import PostPage from "./pages/PostPage/PostPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import JoinedMeetingPage from "./pages/JoinedMeetingPage/JoinedMeetingPage";
import MeetingModificationPage from "./pages/MeetingModificationPage/MeetingModificationPage";
import NoticePage from "./pages/NoticePage/NoticePage";
import PostModificationPage from "./pages/ModificationPage/PostModificationPage";
import NoticeModificationPage from "./pages/ModificationPage/NoticeModificationPage";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="additional" element={<MeetingCreate />} />
          <Route path="meeting/:meetingId" element={<MeetingRoom />} />
          <Route path="chating/:roomId" element={<ChatingRoom />} />
          <Route path="mypage/:id" element={<UserPage />} />
          <Route path="joind/meeting" element={<JoinedMeetingPage />} />
          <Route
            path="meeting/:meetingId/:postId/post/modification"
            element={<PostModificationPage />}
          />
          <Route
            path="meeting/:meetingId/:noticeId/notice/modification"
            element={<NoticeModificationPage />}
          />
          <Route
            path="meeting/:meetingId/:postId/post"
            element={<PostPage />}
          />
          <Route
            path="meeting/:meetingId/:noticeId/notice"
            element={<NoticePage />}
          />
          <Route
            path="meeting/:meetingId/createpost"
            element={<CreatePostPage />}
          />
          <Route
            path="meeting/:meetingId/modification"
            element={<MeetingModificationPage />}
          />
          <Route path="search/:title" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
