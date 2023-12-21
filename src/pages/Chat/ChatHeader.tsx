import styled from "styled-components";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { formatTime } from "../../helpers/dayjs";

interface IChatHeaderProps {
  setLayout: (layout: boolean) => void;
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date | undefined;
}

const ChatHeader = ({
  setLayout,
  receiverName,
  receiverImage,
  lastMessageTime,
}: IChatHeaderProps) => {
  return (
    <StChatHeaderWrapper>
      <StHeaderContent>
        <StBackButton onClick={() => setLayout(false)} className="md:hidden">
          <IoChevronBackCircleSharp />
        </StBackButton>
        <StReceiverInfo>
          <StReceiverImage>
            <StReceiverImageSource src={receiverImage || ""} alt="" />
          </StReceiverImage>
          <div>
            <StReceiverName>{receiverName}</StReceiverName>
            {lastMessageTime && (
              <StLastMessageTime>
                {formatTime(lastMessageTime)}
              </StLastMessageTime>
            )}
          </div>
        </StReceiverInfo>
      </StHeaderContent>
    </StChatHeaderWrapper>
  );
};

export default ChatHeader;

const StChatHeaderWrapper = styled.div`
  padding-left: 1rem;
  border-bottom: 1px solid;
`;

const StHeaderContent = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  gap: 1rem;
`;

const StBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: gray;
  &:hover {
    color: gray;
  }
`;

const StReceiverInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const StReceiverImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  background: gray;
  border-radius: 50%;
`;

const StReceiverImageSource = styled.img`
  width: 100%;
  height: 100%;
`;

const StReceiverName = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
`;

const StLastMessageTime = styled.p`
  color: gray;
`;
