import { Avatar, Grid, Paper } from "@mui/material";
import { ICON } from "../Constants";
import "../App.css";

const ChatPage = () => {
  return (
    <Grid>
      <Paper className="loginPaper">
        <Grid container direction="column" alignItems="center">
          <Avatar src={ICON} />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ChatPage;
