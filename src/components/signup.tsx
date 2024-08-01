import { Grid, TextField, Button, Avatar, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/UserApiClient";
import {
  SIGNUP_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  SIGNIN_UI_DIRECTIONS,
  LOGIN_TEXT,
  ICON,
} from "../Constants";
import "../App.css";
import { setCurrentUserId, setCurrentUsername } from "../globalvaryables";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    if (!username || !password) return;

    if (isPasswordStrong(password)) {
      try {
        const data = await signUp(username, password);
        setCurrentUserId(data);
        console.log(data);
        setError(null);
        setCurrentUsername(username);
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
    <Grid container className="root">
      <Paper className="loginPaper">
        <Grid container direction="column" alignItems="center">
          <Avatar src={ICON} />
        </Grid>
        <Grid>
          <h2>{SIGNUP_TEXT}</h2>
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
            onClick={handleRegistration}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mb: 1 }}
          >
            {SIGNUP_TEXT}
          </Button>
          <h4>{SIGNIN_UI_DIRECTIONS}</h4>
        </Grid>
        <Button
          onClick={handleToggle}
          color="secondary"
          variant="text"
          sx={{ mt: 2 }}
          fullWidth
        >
          {LOGIN_TEXT}
        </Button>
      </Paper>
    </Grid>
  );
};

export default SignUpPage;
