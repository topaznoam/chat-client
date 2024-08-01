import React, { useEffect, useState } from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { ICON, SERVER_URL } from "../Constants";
import "../App.css";
import Group from "./Group";
import MessageBar from "./MessageBar";
import Message, { MessageProps } from "./Message";
import { currentUsername, setCurrentSocket } from "../globalvaryables";
import { io, Socket } from "socket.io-client";

export type SocketType = Socket<any, any>;

export const openSocket = (): SocketType => {
  const newSocket = io(SERVER_URL, { transports: ["websocket"] });
  setCurrentSocket(newSocket);
  return newSocket;
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentGroup, setCurrentGroup] = useState<string>(
    "WELCOME TO SMARTCHAT"
  );

  const groups = [
    { id: 1, name: "Group 1", icon: ICON },
    { id: 2, name: "Group 2", icon: ICON },
    { id: 3, name: "Group 3", icon: ICON },
    { id: 4, name: "Group 4", icon: ICON },
    { id: 5, name: "Group 5", icon: ICON },
    { id: 6, name: "Group 6", icon: ICON },
    { id: 1, name: "Group 1", icon: ICON },
    { id: 2, name: "Group 2", icon: ICON },
    { id: 3, name: "Group 3", icon: ICON },
    { id: 4, name: "Group 4", icon: ICON },
    { id: 5, name: "Group 5", icon: ICON },
    { id: 6, name: "Group 6", icon: ICON },
  ];

  const createNewMessage = (newMessage: MessageProps) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    const socket = openSocket();

    socket.on("onMessage", (content: { content: MessageProps }) => {
      console.log(content);
      const newMessage: MessageProps = {
        id: content.content.id,
        text: content.content.text,
        time: content.content.time,
        isSent: content.content.senderusername === currentUsername,
        senderusername: content.content.senderusername,
      };
      console.log(newMessage);
      createNewMessage(newMessage);
    });

    return () => {
      socket.off("onMessage");
      socket.close();
    };
  }, []);

  const handleGroupClick = (groupName: string) => {
    setCurrentGroup(groupName);
    setMessages([]);
  };

  return (
    <Grid>
      <Paper className="chatPaper">
        <Grid container direction="column" className="chatContainer">
          <Grid container alignItems="center" className="chatHeader">
            <Avatar src={ICON} />
            <div className="chatTitle">{currentGroup}</div>
          </Grid>
          <Grid container>
            <Grid className="MessagesBoxAndBar">
              <Grid className="chatMessages">
                {messages.map((message: MessageProps) => (
                  <Message key={message.id} {...message} />
                ))}
              </Grid>
              <MessageBar />
            </Grid>
            <Grid className="groups">
              {groups.map((group) => (
                <Group
                  key={group.id}
                  onClick={() => handleGroupClick(group.name)}
                  {...group}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ChatPage;
