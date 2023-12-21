import { atom } from "recoil";
import defaultimage from "../src/images/default_profile.png";
import { getCookie } from "./shared/Cookie";

// 신청하기, 대화하기 버튼 - room name
export const roomNameState = atom<string>({
  key: "roomNameState",
  default: "",
});

// 신청하기, 대화하기 버튼 - 유저들 이름
export const chatEnteredUsersNicknameState = atom({
  key: "chatEnteredUsersNicknameState",
  default: [],
});

// 신청하기, 대화하기 - 게시글 제목
export const chatRoomChatRecordState = atom({
  key: "chatRoomChatRecordState",
  default: "",
});

// 신청하기, 대화하기 - 게시글 제목
export const chatRoomPostTitleState = atom({
  key: "chatRoomPostTitleState",
  default: "",
});

// 신청하기, 대화하기 - 유저 정보 state
export const chatRoomUserInfoState = atom({
  key: "chatRoomUserInfoState",
  default: [],
});

//유저 프로필 사진
export const profileImageState = atom({
  key: "profileImageState",
  default: defaultimage,
});

// 쿠키 상태를 저장하는 atom 정의
export const cookieState = atom({
  key: "cookieState",
  default: getCookie("token") ? true : false,
});

//  채팅방 관련 상태값들  //
// 채팅 상태값 관리
interface Message {
  sender: string;
  content: string;
}

export const messagesState = atom({
  key: "messagesState",
  default: [] as Message[],
});

//유저 상태값 관리
export const userEmailState = atom({
  key: "userEmailState",
  default: "",
});
