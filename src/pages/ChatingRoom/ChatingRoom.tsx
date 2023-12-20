import React, { useEffect, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { atom, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";

interface Message {
  sender: string;
  content: string;
}

const messagesState = atom({
  key: "messagesState",
  default: [] as Message[],
});

const ChantingRoom = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [text, setText] = useState("");
  const meetingId = useParams();
  const roomId = meetingId.meetingId;
  const token = getCookie("token");

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        setConnected(true);
        stompClient.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
          if (message.body) {
            let msg: Message = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
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
      let msg: Message = { sender: "User", content: text };
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify(msg),
        headers: { Authorization: `Bearer ${token}` },
      });
      setText("");
    }
  };

  const enterRoom = () => {
    if (client) {
      client.publish({
        destination: `/app/chat/enter/${roomId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

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
          <button onClick={enterRoom}>Enter Room</button>
        </div>
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default ChantingRoom;
