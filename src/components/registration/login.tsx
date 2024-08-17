import { Grid, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import {
  LOGIN_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  LOGIN_UI_DIRECTIONS,
  SIGNUP_TEXT,
} from "../../Constants";
import { logIn } from "../../api/UserApiClient";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import "./registration.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useGlobalContext();

  const handleLogin = async () => {
    try {
      if (username && password) {
        const data = await logIn(username, password);
        console.log(data);
        const user = {
          myId: data.id,
          myAvatar: data.avatar,
          myUserName: data.username,
        };
        setCurrentUser(user);
        setError(null);
        navigate("/chat");
      } else {
        setError("Please enter both username and password.");
      }
    } catch (error) {
      setError("Username or password incorrect");
    }
  };

  const handleToggle = () => {
    navigate("/signup");
  };

  return (
    <Grid
      container
      className="root"
      alignItems="center"
      justifyContent="center"
    >
      <Paper className="loginPaper" elevation={3}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <h2>{LOGIN_TEXT}</h2>
          </Grid>
          <Grid item>{error && <p style={{ color: "red" }}>{error}</p>}</Grid>
          <Grid item>
            <TextField
              label={USERNAME_LABEL}
              placeholder={USERNAME_INSTRUCTIONS}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label={PASSWORD_LABEL}
              placeholder={PASSWORD_INSTRUCTIONS}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleLogin}
              type="button"
              color="primary"
              variant="contained"
            >
              {LOGIN_TEXT}
            </Button>
          </Grid>
          <Grid item>
            <h4>{LOGIN_UI_DIRECTIONS}</h4>
          </Grid>
          <Grid item>
            <Button onClick={handleToggle} color="secondary" variant="text">
              {SIGNUP_TEXT}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
