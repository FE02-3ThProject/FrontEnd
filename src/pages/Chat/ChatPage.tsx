import { useEffect, useState } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import ChatClient from "./ChatClient";

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }
    fetchCurrentUser();
  }, []);

  // currentUser가 null인 경우 로딩 상태를 표시
  if (!currentUser) return <div>Loading...</div>;

  return <ChatClient currentUser={currentUser} />;
};

export default ChatPage;
