import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { SERVER_URL } from "../Constants";
import "../App.css";
import Group, { GroupProps } from "./Group";
import MessageBar from "./MessageBar";
import Message, { MessageProps } from "./Message";
import {
  currentUserId,
  currentUserImg,
  currentUsername,
  setCurrentGroupId,
  setCurrentSocket,
  setCurrentUserId,
} from "../globalvaryables";
import { io, Socket } from "socket.io-client";
import { getGroupMessages } from "../api/MessagesApiClient";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import { getMyGroups, sendCurrentGroupId } from "../api/GroupApiCliient";
import BlockPage from "./BlockPage";
import AvatarImg from "./AvatarImg";
import UserIdentity, { selfUserProps } from "./UserIdentity";

export type SocketType = Socket<any, any>;

export const openSocket = (): SocketType => {
  const newSocket = io(SERVER_URL, { transports: ["websocket"] });
  setCurrentSocket(newSocket);
  return newSocket;
};

const ChatPage: React.FC = () => {
  const [myUser, setUser] = useState<selfUserProps | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentGroup, setCurrentGroup] = useState<GroupProps>();
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const navigate = useNavigate();

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
        isSent: message.senderusername === currentUsername,
        senderusername: message.senderusername,
      }));
      setMessages(currentgroupmessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const loadGroups = async () => {
    try {
      if (currentUserId) {
        const groups = await getMyGroups(currentUserId);
        setGroups(groups);
      }
    } catch (error) {
      console.error("Failed to load groups:", error);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      const user: selfUserProps = {
        myAvatar: currentUserImg,
        myUserName: currentUsername,
      };
      setUser(user);
      loadGroups();
      const socket = openSocket();
      socket.on("onMessage", (content: { content: MessageProps }) => {
        const newMessage: MessageProps = {
          id: content.content.id,
          text: content.content.text,
          time: content.content.time,
          isSent: content.content.senderusername === currentUsername,
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
      setCurrentGroupId(group.id);
      setCurrentGroup(group);
      await getMessages(group.id);
      sendCurrentGroupId(group.id);
    })();
  };

  const handleAddGroupClick = () => {
    navigate("/creategroup");
  };

  return (
    <Grid>
      {currentUserId ? (
        <Grid className="appcontainer">
          <UserIdentity
            myUserName={myUser?.myUserName}
            myAvatar={myUser?.myAvatar}
          ></UserIdentity>

          <Paper className="chatPaper">
            <Grid container direction="column" className="chatContainer">
              <Grid>
                {currentGroup ? (
                  <Grid container alignItems="center" className="chatHeader">
                    <AvatarImg
                      img={currentGroup.avatar}
                      isUserImg={false}
                      id={currentGroup.id}
                    ></AvatarImg>
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
        <BlockPage></BlockPage>
      )}
    </Grid>
  );
};

export default ChatPage;
