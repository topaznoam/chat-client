import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { ICON } from "../Constants";
import { currentUserId } from "../globalvaryables";
import User, { UserProps } from "./user";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/UserApiClient";

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);

  const handleCreateClick = () => {
    navigate("/chat");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        console.log(fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Grid>
      {currentUserId ? (
        <Paper className="chatPaper">
          <Grid container>
            <TextField
              id="standard-basic"
              label=" Choose Group Name"
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
