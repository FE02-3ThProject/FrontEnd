import { useEffect, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";
import { messagesState } from "../../Atoms";
import { userEmailState } from "../../Atoms";
import Loading from "../../components/loading/Loading";

interface Message {
  sender: string;
  content: string;
}

const ChantingRoom = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [text, setText] = useState("");
  const meetingId = useParams();
  const roomId = meetingId.meetingId;
  const token = getCookie("token");
  const userEmail = useRecoilState(userEmailState);

  useEffect(() => {
    const sock = new SockJS("https://api.moim-moim.shop:9090");
    const stompClient = new Client({
      brokerURL: "wss://15.164.234.129:9090/ws",
      connectHeaders: {
        "X-AUTH-TOKEN": token,
        Authorization: `${token}`,
      },
      onConnect: () => {
        setConnected(true);
        stompClient.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
          if (message.body) {
            const msg: Message = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        });
        stompClient.publish({
          destination: `/app/chat/enter/${roomId}`,
          headers: { Authorization: `${token}` },
        });
      },
    });
    setClient(stompClient);
    stompClient.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [roomId, token]);

  const sendMessage = () => {
    if (client) {
      const msg: Message = { sender: "User", content: text };
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify(msg),
        headers: { Authorization: `${token}` },
      });
      setText("");
    }
  };

  console.log(connected);

  return (
    <div>
      {connected ? (
        <div>
          {messages.map((msg, idx) => (
            <div key={idx}>
              <h3>{msg.sender}</h3>
              <p>{msg.content}</p>
            </div>
          ))}
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ChantingRoom;
