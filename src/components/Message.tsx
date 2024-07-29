import React from "react";
import { Grid, Typography } from "@mui/material";
import "../App.css";

interface MessageProps {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ id, text, time, isSent }) => {
  return (
    <Grid>
      <Grid className="messagecontainer">
        <Grid
          item
          className={`chatMessage ${
            isSent ? "sentMessage" : "receivedMessage"
          }`}
          id={id.toString()}
        >
          <Typography variant="body2" className="messageText">
            {text}
          </Typography>
          <Typography variant="caption" className="messageTime">
            {new Date(time).toLocaleTimeString()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;
