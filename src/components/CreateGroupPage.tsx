import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { ICON } from "../Constants";
import User, { UserProps } from "./user";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/UserApiClient";
import { createGroup } from "../api/GroupApiCliient";
import BlockPage from "./BlockPage";
import { useGlobalContext } from "../GlobalContext";

const CreateGroupPage: React.FC = () => {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [groupName, setGroupName] = useState<string>("");

  const handleCheckboxChange = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, checkbox: !user.checkbox } : user
      )
    );
  };

  const handleCreateClick = async () => {
    if (currentUser?.myId) {
      const usersIdList = [
        currentUser.myId,
        ...users.filter((user) => user.checkbox).map((user) => user.id),
      ];
      try {
        await createGroup(groupName, usersIdList, ICON);
        navigate("/chat");
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        const filteredUsers = fetchedUsers.filter(
          (user: UserProps) => user.id !== currentUser?.myId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <Grid>
      {currentUser?.myId ? (
        <Paper className="chatPaper">
          <Grid container>
            <TextField
              id="standard-basic"
              label="Choose Group Name"
              variant="standard"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Grid>
          <Grid className="users">
            {users.map((user) => (
              <User
                key={user.id}
                {...user}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </Grid>
          <Grid>
            <Button
              type="button"
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
        <BlockPage />
      )}
    </Grid>
  );
};

export default CreateGroupPage;
