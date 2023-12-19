import { apiToken } from "../Apis";

type ChatListType = {
    token: string;
    itemId?: string;
    roomId?: number | null;
  };
  // 채팅방 목록 조회
  export const getChatList = async () => {
    try {
      const response = await apiToken.get(`/chat/rooms`);
  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  // 채팅방 개설
  export const ChatRoom = async ({ itemId }: ChatListType) => {
    try {
      const response = await apiToken.post(
        `/chat/room/${itemId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  //메시지 가져오기
  export const getMessages = async ({ roomId }: ChatListType) => {
    try {
      const response = await apiToken.get(`/message/${roomId}`);
  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  // 채팅방 나가기
  export const GoOutChatRoom = async ({ roomId }: ChatListType) => {
    try {
      const response = await apiToken.delete(`chat/room/${roomId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  