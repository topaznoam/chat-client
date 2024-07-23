import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";

const AuthForm = () => {
  const [form, setForm] = useState(false);

  const handleToggle = () => {
    setForm(!form);
  };
  return (
    <Grid>
      <h2>{form ? "Sign Up" : "Log In"}</h2>
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
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        sx={{ mb: 1 }}
      >
        {form ? "Sign Up" : "Log In"}
      </Button>
      <h4>{form ? "Already have an account?" : "Don't have an account?"}</h4>
      <Button
        onClick={handleToggle}
        color="secondary"
        variant={form ? "text" : "outlined"}
        sx={{ mb: 1 }}
        fullWidth
      >
        {form ? "Log In" : "Sign Up"}
      </Button>
    </Grid>
  );
};

export default AuthForm;
