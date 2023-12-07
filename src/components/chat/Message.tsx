import styled from "styled-components";
import { fromNow } from "../../helpers/dayjs";

interface IMessage {
  isSender: boolean;
  messageText?: string | null;
  messageImage?: string | null;
  receiverName: string;
  receiverImage: string;
  senderImage?: string | null;
  time: Date;
}

const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: IMessage) => {
  return (
    <StMessageWrapper isSender={isSender}>
      <StUserImage>
        <img
          src={senderImage && isSender ? senderImage : receiverImage}
          alt=""
        />
      </StUserImage>
      <StMessageContent>
        <StMessageDetails>
          <StUser>{isSender ? "You" : receiverName}</StUser>
          <StTime>{fromNow(time)}</StTime>
        </StMessageDetails>
        {messageText && (
          <StMessageText isSender={isSender}>
            <p>{messageText}</p>
          </StMessageText>
        )}
        {messageImage && (
          <StMessageImage>
            <img
              style={{ width: "300px", height: "300px" }}
              src={messageImage}
              alt=""
            />
          </StMessageImage>
        )}
      </StMessageContent>
    </StMessageWrapper>
  );
};

export default Message;

const StMessageWrapper = styled.div<{ isSender: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: 40px 1fr;
  gap: 3px;
  margin: 0 auto;
  direction: ${(props) => (props.isSender ? "rtl" : "ltr")};
`;

const StUserImage = styled.div`
  width: 10px;
  height: 10px;
  margin-top: 2px;
  overflow: hidden;
  background: gray;
  border-radius: 50%;
`;

const StMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const StMessageText = styled.div<{ isSender: boolean }>`
  padding: 2px;
  word-break: break-all;
  color: white;
  border-radius: 4px;
  background: ${(props) => (props.isSender ? "orange" : "gray")};
`;

const StMessageImage = styled.div`
  overflow: hidden;
  border-radius: 4px;
  margin: 0.6rem;
  max-width: 80%;
`;
const StMessageDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 2px;
  font-size: small;
`;

const StUser = styled.span`
  font-weight: bold;
`;

const StTime = styled.span`
  color: gray;
  opacity: 0.8;
  font-size: x-small;
`;
