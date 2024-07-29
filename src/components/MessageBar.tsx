import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";

const MessageBar = () => {
  return (
    <Grid container alignItems="center" className="chatInputContainer">
      <TextField
        variant="outlined"
        placeholder="Type a message..."
        className="chatInput"
      />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Grid>
  );
};
export default MessageBar;
