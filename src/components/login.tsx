import { Avatar, Grid, Paper } from "@mui/material";
import { ICON } from "../Constants";
import "../App.css";
import AuthForm from "./AuthForm";

const LoginPage = () => {
  return (
    <Grid container className="root">
      <Paper className="loginPaper">
        <Grid container direction="column" alignItems="center">
          <Avatar src={ICON} />
        </Grid>
        <AuthForm />
      </Paper>
    </Grid>
  );
};

export default LoginPage;
