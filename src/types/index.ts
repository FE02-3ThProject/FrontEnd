import axios from "axios";

export type TUser = {
  createdAt: string;
  updatedAt: string;
  email: string;
  id: string;
};

export type TUserWithChat = TUser & {
  conversations: TConversation[];
  email: string;
  image: string;
};

export type TGroup = {
  createdAt: string;
  updatedAt: string;
};

export type TConversation = {
  id: string;
  messages: TMessage[];
  users: TUser[];
};

export type TMessage = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  receiverId: string;
  senderId: string;
  image: string;
};

export const fetchUser = async (userId: string): Promise<TUser> => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};

export const fetchGroup = async (roomId: string): Promise<TGroup> => {
  const response = await axios.get(`/message/${roomId}`);
  return response.data;
};

export const fetchConversation = async (
  conversationId: string
): Promise<TConversation> => {
  const response = await axios.get(`/api/conversations/${conversationId}`);
  return response.data;
};

export const fetchMessage = async (messageId: string): Promise<TMessage> => {
  const response = await axios.get(`/api/messages/${messageId}`);
  return response.data;
};
