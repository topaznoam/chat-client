import React from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { ICON } from "../Constants";
import { currentUserId } from "../globalvaryables";
import User, { UserProps } from "./user";
import { useNavigate } from "react-router-dom";

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/chat");
  };
  const users: UserProps[] = [
    { id: 1, name: "Group 1", icon: ICON, checkbox: false },
    { id: 2, name: "Group 2", icon: ICON, checkbox: false },
    { id: 3, name: "Group 3", icon: ICON, checkbox: false },
    { id: 4, name: "Group 4", icon: ICON, checkbox: false },
    { id: 5, name: "Group 5", icon: ICON, checkbox: false },
    { id: 6, name: "Group 6", icon: ICON, checkbox: false },
    { id: 7, name: "Group 7", icon: ICON, checkbox: false },
    { id: 8, name: "Group 8", icon: ICON, checkbox: false },
    { id: 9, name: "Group 9", icon: ICON, checkbox: false },
    { id: 10, name: "Group 10", icon: ICON, checkbox: false },
    { id: 11, name: "Group 11", icon: ICON, checkbox: false },
    { id: 12, name: "Group 12", icon: ICON, checkbox: false },
  ];

  return (
    <Grid>
      {currentUserId ? (
        <Paper className="chatPaper">
          <Grid container>
            <TextField
              id="standard-basic"
              label="group name"
              variant="standard"
            />
          </Grid>
          <Grid className="users">
            {users.map((user) => (
              <User key={user.id} {...user} />
            ))}
          </Grid>
          <Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleCreateClick}
              sx={{ mt: 1 }}
            >
              <h4>CREATE</h4>
            </Button>
          </Grid>
        </Paper>
      ) : (
        <Grid>
          <LockIcon />
        </Grid>
      )}
    </Grid>
  );
};

export default CreateGroupPage;
