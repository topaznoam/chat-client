import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import AvatarImg from "./AvatarImg";
import { useGlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import BlockPage from "./BlockPage";

const User: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setCurrentGroup, setCurrentSocket } =
    useGlobalContext();

  const handleLogoutClick = () => {
    setCurrentUser(null);
    setCurrentGroup(null);
    setCurrentSocket(null);
    navigate("/login");
  };

  if (!currentUser) {
    return <BlockPage />;
  }

  return (
    <Grid>
      <Paper sx={{ mr: 2 }}>
        <Grid item>
          {currentUser.myAvatar ? (
            <AvatarImg
              img={currentUser.myAvatar}
              isUserImg={true}
              id={currentUser.myId}
            />
          ) : null}

          <Typography variant="h4" sx={{ m: 1 }}>
            {`Welcome back ${currentUser.myUserName}`}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ m: 1 }}
            onClick={handleLogoutClick}
          >
            Log Out
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default User;
