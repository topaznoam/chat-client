import { Grid, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/UserApiClient";
import { useGlobalContext } from "../../GlobalContext";
import {
  SIGNUP_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  SIGNIN_UI_DIRECTIONS,
  LOGIN_TEXT,
  ICON,
} from "../../Constants";
import "./registration.css";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useGlobalContext();

  const isPasswordStrong = (password: string): boolean => {
    const lengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const numberCheck = /\d/.test(password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!lengthCheck) {
      setError("Your password must be at least 8 characters long.");
      return false;
    }
    if (!uppercaseCheck) {
      setError("Your password must contain at least one uppercase letter.");
      return false;
    }
    if (!numberCheck) {
      setError("Your password must contain at least one number.");
      return false;
    }
    if (!specialCharCheck) {
      setError("Your password must contain at least one special character.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleRegistration = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    if (isPasswordStrong(password)) {
      try {
        const data = await signUp(username, password);
        const user = {
          myId: data.id,
          myAvatar: ICON,
          myUserName: username,
        };
        setCurrentUser(user);
        setError(null);
        navigate("/chat");
      } catch (error) {
        setError("Username already exists");
      }
    }
  };

  const handleToggle = () => {
    navigate("/login");
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
            <h2>{SIGNUP_TEXT}</h2>
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
              onClick={handleRegistration}
              type="button"
              color="primary"
              variant="contained"
            >
              {SIGNUP_TEXT}
            </Button>
          </Grid>
          <Grid item>
            <h4>{SIGNIN_UI_DIRECTIONS}</h4>
          </Grid>
          <Grid item>
            <Button onClick={handleToggle} color="secondary" variant="text">
              {LOGIN_TEXT}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SignUpPage;
