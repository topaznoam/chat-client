import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import {
  SIGNUP_TEXT,
  LOGIN_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  SIGNIN_UI_DIRECTIONS,
  LOGIN_UI_DIRECTIONS,
} from "../Constants";
import { SignUp, LogIn } from "../api/UserApiClient";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [form, setForm] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();

  const handleToggle = () => {
    setForm(!form);
    setError(null);
  };

  const handleRegistration = async () => {
    try {
      if (username && password) {
        const data = form
          ? await SignUp(username, password)
          : await LogIn(username, password);
        console.log(data);
        setError(null);
        navigation("/chat");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Grid>
      <h2>{form ? SIGNUP_TEXT : LOGIN_TEXT}</h2>
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
        {form ? SIGNUP_TEXT : LOGIN_TEXT}
      </Button>
      <h4>{form ? SIGNIN_UI_DIRECTIONS : LOGIN_UI_DIRECTIONS}</h4>
      <Button
        onClick={handleToggle}
        color="secondary"
        variant="text"
        sx={{ mb: 1 }}
        fullWidth
      >
        {form ? LOGIN_TEXT : SIGNUP_TEXT}
      </Button>
    </Grid>
  );
};

export default AuthForm;
