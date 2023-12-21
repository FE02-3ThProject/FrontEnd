import { useEffect, useState } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import ChatClient from "./ChatClient";
import { Client } from "@stomp/stompjs";

interface User {
  email: string;
  createdAt: string;
  updatedAt: string;
}

let stompClient: Client;

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      const user: User | null = await getCurrentUser();
      setCurrentUser(user);
    }
    fetchCurrentUser();
  }, []);

  // Stomp.js 클라이언트를 설정하고 활성화
  useEffect(() => {
    if (currentUser) {
      stompClient = new Client({
        webSocketFactory: () => new WebSocket("/chat/{roomId}"),
        onConnect: () => {
          console.log("Connected to WebSocket server");
        },
      });

      stompClient.activate();
    }

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [currentUser]);

  // currentUser가 null인 경우 로딩 상태를 표시
  if (!currentUser) return <div>Loading...</div>;

  return <ChatClient currentUser={currentUser} />;
};

export default ChatPage;
