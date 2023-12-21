import styled from "styled-components";
import { fromNow } from "../../helpers/dayjs";
import { TConversation, TUserWithChat } from "../../types";

interface IUserProps {
  user: TUserWithChat;
  currentUserId: string;
}

const User = ({ user, currentUserId }: IUserProps) => {
  const messagesWihCurrentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find((user) => user.id === currentUserId)
  );

  const latestMessage = messagesWihCurrentUser?.messages.slice(-1)[0];

  return (
    <StUserWrapper>
      <StUserImageWrapper>
        <StUserImageSource src={user.image || ""} alt="" />
      </StUserImageWrapper>
      <div>
        <StUserName>{user.name}</StUserName>
        {latestMessage && (
          <StLatestMessage>{latestMessage.text}</StLatestMessage>
        )}
        {latestMessage && latestMessage.image && (
          <StImageMessage>[이미지]</StImageMessage>
        )}
      </div>
      <StMessageTime>
        {latestMessage && <p>{fromNow(latestMessage?.createdAt)}</p>}
      </StMessageTime>
    </StUserWrapper>
  );
};

export default User;

const StUserWrapper = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 50px;
  grid-template-rows: 40px;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid;
  &:hover {
    cursor: pointer;
    background: #0f78ee;
  }
`;

const StUserImageWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  background: white;
  border-radius: 50%;
`;

const StUserImageSource = styled.img`
  width: 100%;
  height: 100%;
`;

const StUserName = styled.h3`
  overflow: hidden;
  font-size: 1rem;
  font-weight: 500;
`;

const StLatestMessage = styled.p`
  overflow: hidden;
  font-size: 0.75rem;
  font-weight: 500;
  color: gray;
  word-break: break-word;
  white-space: pre-wrap;
`;

const StImageMessage = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: gray;
`;

const StMessageTime = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  color: gray;
`;
