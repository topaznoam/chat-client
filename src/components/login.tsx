import { Grid, TextField, Button, Avatar, Paper } from "@mui/material";
import { useState } from "react";
import {
  LOGIN_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  LOGIN_UI_DIRECTIONS,
  SIGNUP_TEXT,
  ICON,
} from "../Constants";
import { logIn } from "../api/UserApiClient";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { setCurrentUserId, setCurrentUsername } from "../globalvaryables";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (username && password) {
        const data = await logIn(username, password);
        setCurrentUserId(data);
        console.log(data);
        setError(null);
        setCurrentUsername(username);
        navigate("/chat");
      }
    } catch (error) {
      setError("Username or password incorrect");
    }
  };

  const handleToggle = () => {
    navigate("/signup");
  };

  return (
    <Grid container className="root">
      <Paper className="loginPaper">
        <Grid container direction="column" alignItems="center">
          <Avatar src={ICON} />
        </Grid>
        <Grid>
          <h2>{LOGIN_TEXT}</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextField
            label={USERNAME_LABEL}
            placeholder={USERNAME_INSTRUCTIONS}
            value={username}
            onChange={(change) => setUsername(change.target.value)}
            sx={{ mb: 1 }}
            fullWidth
            required
          />
          <TextField
            label={PASSWORD_LABEL}
            placeholder={PASSWORD_INSTRUCTIONS}
            type="password"
            value={password}
            onChange={(change) => setPassword(change.target.value)}
            sx={{ mb: 1 }}
            fullWidth
            required
          />
          <Button
            onClick={handleLogin}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mb: 1 }}
          >
            {LOGIN_TEXT}
          </Button>
          <h4>{LOGIN_UI_DIRECTIONS}</h4>
        </Grid>
        <Button
          onClick={handleToggle}
          color="secondary"
          variant="text"
          sx={{ mt: 2 }}
          fullWidth
        >
          {SIGNUP_TEXT}
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
