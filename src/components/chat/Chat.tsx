import styled from "styled-components";
import { useEffect, useRef } from "react";
import Input from "./Input";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import { TConversation, TUser, TUserWithChat } from "../../types";

interface IChatProps {
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  currentUser: TUserWithChat | null; // currentUser가 undefined가 될 수 있으므로 null을 추가
  setLayout: (layout: boolean) => void;
}

const Chat = ({ currentUser, receiver, setLayout }: IChatProps) => {
  const conversation: TConversation | undefined =
    currentUser?.conversations.find((conversation: TConversation) =>
      conversation.users?.find((user: TUser) => user.id === receiver.receiverId)
    );

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []); // useEffect에 dependency array를 추가

  if (!receiver.receiverName || !currentUser)
    return <StNoChatWrapper></StNoChatWrapper>;

  return (
    <StChatWrapper>
      <ChatHeader
        setLayout={setLayout}
        receiverName={receiver.receiverName}
        receiverImage={receiver.receiverImage}
        lastMessageTime={
          conversation?.messages
            .filter((message) => message.receiverId === currentUser?.id) // currentUser가 null일 수 있으므로 optional chaining 사용
            .slice(-1)[0]?.createdAt
            ? new Date(
                conversation?.messages
                  .filter((message) => message.receiverId === currentUser?.id) // currentUser가 null일 수 있으므로 optional chaining 사용
                  .slice(-1)[0]?.createdAt
              )
            : undefined // createdAt이 없을 경우를 대비해 기본값 undefined 설정
        }
      />
      <StMessagesWrapper>
        {conversation &&
          conversation.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.senderId === currentUser?.id} // currentUser가 null일 수 있으므로 optional chaining 사용
                messageText={message.text}
                messageImage={message.image}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser?.image || ""} // image가 없을 경우를 대비해 기본값 '' 설정
                time={
                  isNaN(Date.parse(message.createdAt))
                    ? new Date()
                    : new Date(message.createdAt)
                } // createdAt이 없을 경우를 대비해 기본값 undefined 설정
              />
            );
          })}
        <div ref={messagesEndRef} />
      </StMessagesWrapper>
      <StInputWrapper>
        <Input
          receiverId={receiver?.receiverId || ""} // receiverId가 없을 경우를 대비해 기본값 '' 설정
          currentUserId={currentUser?.id || ""} // currentUser가 null일 수 있으므로 optional chaining 사용하고, id가 없을 경우를 대비해 기본값 '' 설정
        />
      </StInputWrapper>
    </StChatWrapper>
  );
};

export default Chat;

const StChatWrapper = styled.div`
  width: 100%;
`;

const StMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  overflow: auto;
  height: calc(100vh - 60px - 70px - 80px);
`;

const StInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const StNoChatWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
