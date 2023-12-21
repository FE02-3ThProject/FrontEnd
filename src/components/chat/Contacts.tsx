import styled from "styled-components";
import User from "./User";
import { TUserWithChat } from "../../types";

interface IContactsProps {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const StContactsWrapper = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100vh - 56px);
  border: 1px solid;
`;

const StTitle = styled.h1`
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StUsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const filterMessages = (
  userId: string,
  userName: string | null,
  userImage: string | null,
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void
) => {
  setReceiver({
    receiverId: userId,
    receiverName: userName || "",
    receiverImage: userImage || "",
  });
};

const Contacts = ({
  users,
  currentUser,
  setLayout,
  setReceiver,
}: IContactsProps) => {
  return (
    <StContactsWrapper>
      <StTitle>Chat</StTitle>

      <hr />

      <StUsersWrapper>
        {users.length > 0 &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => {
              return (
                <div
                  key={user.id}
                  onClick={() => {
                    filterMessages(user.id, user.name, user.image, setReceiver);
                    setLayout(true);
                  }}
                >
                  <User user={user} currentUserId={currentUser?.id} />
                </div>
              );
            })}
      </StUsersWrapper>
    </StContactsWrapper>
  );
};

export default Contacts;
