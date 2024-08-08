import React from "react";
import { Grid, Typography } from "@mui/material";
import "../App.css";

export type MessageProps = {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
  senderusername: string | null;
};

const Message: React.FC<MessageProps> = (message: MessageProps) => {
  return (
    <Grid sx={{ mt: 1 }}>
      <Grid className="messageContainer">
        <Grid
          item
          className={`chatMessage ${
            message.isSent ? "sentMessage" : "receivedMessage"
          }`}
          id={message.id.toString()}
        >
          <Grid>
            <Typography variant="body2" className="messageText">
              {message.senderusername}
            </Typography>
          </Grid>
          <Typography variant="h5" className="messageText">
            {message.text}
          </Typography>
          <Typography variant="caption" className="messageTime">
            {`${message.time.split(":")[0]}:${message.time.split(":")[1]}`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;
