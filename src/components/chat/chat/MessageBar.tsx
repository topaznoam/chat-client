import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./chat.css";
import { useGlobalContext } from "../../../GlobalContext";
import { sendMessage } from "../../../api/MessagesApiClient";

export type Message = {
  data: string;
  user: number | null;
  group: number | null;
};

const MessageBar: React.FC = () => {
  const [message, setMessage] = useState("");
  const { currentUser, currentGroup } = useGlobalContext();
  const { currentSocket } = useGlobalContext();

  const handleSendClick = (text: string) => {
    if (text) {
      const msg: Message = {
        data: text,
        user: currentUser?.myId ?? null,
        group: currentGroup?.id ?? null,
      };
      currentSocket
        ? sendMessage(msg, currentSocket)
        : console.error("not connected");
      setMessage("");
    }
  };

  return (
    <Grid container alignItems="center" className="chatInputContainer">
      <TextField
        variant="outlined"
        placeholder="Type a message..."
        className="chatInput"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton color="primary" onClick={() => handleSendClick(message)}>
        <SendIcon />
      </IconButton>
    </Grid>
  );
};

export default MessageBar;
