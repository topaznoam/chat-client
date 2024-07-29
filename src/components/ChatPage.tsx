import React, { useState } from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { ICON } from "../Constants";
import "../App.css";
import Group from "./Group";
import MessageBar from "./MessageBar";
import Message from "./Message";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, welcome to the chat!",
      time: new Date().toISOString(),
      isSent: true,
    },
    {
      id: 2,
      text: "This is the second message.",
      time: new Date().toISOString(),
      isSent: false,
    },
    {
      id: 3,
      text: "Another message here.",
      time: new Date().toISOString(),
      isSent: true,
    },
  ]);

  const [currentGroup, setCurrentGroup] = useState<string>("CHAT");

  const groups = [
    { id: 1, name: "Group 1", icon: ICON },
    { id: 2, name: "Group 2", icon: ICON },
    { id: 3, name: "Group 3", icon: ICON },
    { id: 4, name: "Group 4", icon: ICON },
    { id: 5, name: "Group 5", icon: ICON },
    { id: 6, name: "Group 6", icon: ICON },
  ];

  const handleGroupClick = (groupName: string) => {
    setCurrentGroup(groupName);
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
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    id={message.id}
                    text={message.text}
                    time={message.time}
                    isSent={message.isSent}
                  />
                ))}
              </Grid>
              <MessageBar />
            </Grid>
            <Grid>
              {groups.map((group) => (
                <Group
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  icon={group.icon}
                  onClick={() => handleGroupClick(group.name)}
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
