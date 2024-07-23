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

const AuthForm = () => {
  const [form, setForm] = useState(false);

  const handleToggle = () => {
    setForm(!form);
  };

  return (
    <Grid>
      <h2>{form ? SIGNUP_TEXT : LOGIN_TEXT}</h2>
      <TextField
        label={USERNAME_LABEL}
        placeholder={USERNAME_INSTRUCTIONS}
        sx={{ mb: 1 }}
        fullWidth
        required
      />
      <TextField
        label={PASSWORD_LABEL}
        placeholder={PASSWORD_INSTRUCTIONS}
        type="password"
        sx={{ mb: 1 }}
        fullWidth
        required
      />
      <Button
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
