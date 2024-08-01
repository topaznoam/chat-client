import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";
import { currentUserId, currentGroupId } from "../globalvaryables";
import { useState } from "react";
import { sendMessage } from "../api/MessagesApiClient";

export type Message = {
  data: string;
  user: number | null;
  group: number | null;
};

const MessageBar = () => {
  const [message, setMessage] = useState("");

  const handleSendClick = (text: string) => {
    if (text) {
      const msg: Message = {
        data: text,
        user: currentUserId,
        group: currentGroupId,
      };
      sendMessage(msg);
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
        onChange={(data) => setMessage(data.target.value)}
      />
      <IconButton color="primary" onClick={() => handleSendClick(message)}>
        <SendIcon />
      </IconButton>
    </Grid>
  );
};

export default MessageBar;
