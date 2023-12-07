import styled from "styled-components";
import { FC, useState } from "react";

import useSWR from "swr";
import axios from "axios";
import { TUser, TUserWithChat } from "../../types";
import Chat from "../../components/chat/Chat";
import Contacts from "../../components/chat/Contacts";

interface IChatClientProps {
  currentUser?: TUser | null;
}

const StMain = styled.main``;

const StGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }
`;

interface IStSectionProps {
  layout: boolean;
}

const StSection = styled.section<IStSectionProps>`
  display: flex;
  @media (max-width: 767px) {
    display: ${(props) => (props.layout ? "none" : "flex")};
  }
`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ChatClient: FC<IChatClientProps> = ({ currentUser }) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`/api/chat`, fetcher, {
    refreshInterval: 1000,
  });

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Error!</p>;

  return (
    <StMain>
      <StGrid>
        <StSection layout={layout}>
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </StSection>

        <StSection layout={!layout}>
          <Chat
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </StSection>
      </StGrid>
    </StMain>
  );
};

export default ChatClient;
