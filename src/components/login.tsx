import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { ICON } from "../const";
import "../App.css";

const Login = () => {
  return (
    <Grid container className="root">
      <Paper className="loginPaper">
        <Grid container direction="column" alignItems="center">
          <Avatar src={ICON}></Avatar>
        </Grid>
        <h2>Sign In</h2>
        <Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            sx={{ mb: 1 }}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            sx={{ mb: 1 }}
            fullWidth
            required
          />
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Sign in
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
