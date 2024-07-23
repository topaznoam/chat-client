import { Avatar, Grid, Paper } from "@mui/material";
import { ICON } from "../const";
import "../App.css";
import AuthForm from "./AuthForm";

const Login = () => {
  return (
    <Grid container className="root">
      <Paper className="loginPaper">
        <Grid container direction="column" alignItems="center">
          <Avatar src={ICON}></Avatar>
        </Grid>
        <AuthForm />
      </Paper>
    </Grid>
  );
};

export default Login;
