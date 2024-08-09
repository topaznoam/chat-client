import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { io } from "socket.io-client";
import { SERVER_URL } from "../Constants";
import "../App.css";
import Group, { GroupProps } from "./Group";
import MessageBar from "./MessageBar";
import Message, { MessageProps } from "./Message";
import { SocketType, useGlobalContext } from "../GlobalContext";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import { getMyGroups, sendCurrentGroupId } from "../api/GroupApiCliient";
import BlockPage from "./BlockPage";
import UserIdentity from "./UserIdentity";
import { getGroupMessages } from "../api/MessagesApiClient";
import StaticAvatarImg from "./StaticAvatarImg";

const ChatPage: React.FC = () => {
  const {
    currentUser,
    currentGroup,
    setCurrentGroup,
    currentSocket,
    setCurrentSocket,
  } = useGlobalContext();

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const navigate = useNavigate();

  const openSocket = (): SocketType => {
    const newSocket = io(SERVER_URL, { transports: ["websocket"] });
    setCurrentSocket(newSocket);
    return newSocket;
  };
  const createNewMessage = (newMessage: MessageProps) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const getMessages = async (groupId: number) => {
    try {
      const messages = await getGroupMessages(groupId);
      const currentgroupmessages = messages.map((message: MessageProps) => ({
        id: message.id,
        text: message.text,
        time: message.time,
        isSent: message.senderusername === currentUser?.myUserName,
        senderusername: message.senderusername,
      }));
      setMessages(currentgroupmessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const loadGroups = async () => {
    try {
      if (currentUser?.myId) {
        const groups = await getMyGroups(currentUser.myId);
        setGroups(groups);
      }
    } catch (error) {
      console.error("Failed to load groups:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadGroups();
      const socket = openSocket();
      socket.on("onMessage", (content: { content: MessageProps }) => {
        const newMessage: MessageProps = {
          id: content.content.id,
          text: content.content.text,
          time: content.content.time,
          isSent: content.content.senderusername === currentUser?.myUserName,
          senderusername: content.content.senderusername,
        };
        createNewMessage(newMessage);
      });

      return () => {
        socket.off("onMessage");
        socket.close();
      };
    }
  }, []);

  const handleGroupClick = (group: GroupProps) => {
    (async () => {
      loadGroups();
      setCurrentGroup(group);
      await getMessages(group.id);
      currentSocket
        ? sendCurrentGroupId(group.id, currentSocket)
        : console.error("not connected");
    })();
  };

  const handleAddGroupClick = () => {
    navigate("/creategroup");
  };

  return (
    <Grid>
      {currentUser ? (
        <Grid className="appcontainer">
          <UserIdentity />
          <Paper className="chatPaper">
            <Grid container direction="column" className="chatContainer">
              <Grid>
                {currentGroup ? (
                  <Grid container alignItems="center" className="chatHeader">
                    <StaticAvatarImg img={currentGroup.avatar} />
                    <Grid className="chatTitle">{currentGroup.name}</Grid>
                  </Grid>
                ) : null}
                <Grid container>
                  <Grid className="MessagesBoxAndBar">
                    <Grid className="chatMessages">
                      {messages.map((message: MessageProps) => (
                        <Message key={message.id} {...message} />
                      ))}
                    </Grid>
                    <MessageBar />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={handleAddGroupClick}
                    sx={{ mt: 1 }}
                  >
                    <GroupAddIcon />
                  </Button>
                </Grid>
                <Grid className="groups">
                  {groups.map((group: GroupProps) => (
                    <Group
                      key={group.id}
                      {...group}
                      onClick={() => handleGroupClick(group)}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <BlockPage />
      )}
    </Grid>
  );
};

export default ChatPage;
