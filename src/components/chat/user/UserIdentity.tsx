import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import AvatarImg from "../avatars/AvatarImg";
import { useGlobalContext } from "../../../GlobalContext";
import { useNavigate } from "react-router-dom";
import BlockPage from "../block/BlockPage";

const User: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setCurrentGroup, setCurrentSocket } =
    useGlobalContext();

  const handleLogoutClick = () => {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("groups");
    setCurrentUser(null);
    setCurrentGroup(null);
    setCurrentSocket(null);
    navigate("/login");
  };

  if (!currentUser) {
    return <BlockPage />;
  }

  return (
    <Grid className="identitypaper">
      <Paper>
        <Grid>
          <Grid className="addpaddingclass">
            {currentUser.myAvatar ? (
              <AvatarImg
                img={currentUser.myAvatar}
                isUserImg={true}
                id={currentUser.myId}
              />
            ) : null}
          </Grid>
          <Grid className="addpaddingclass">
            <Typography variant="h4">
              {`Welcome back ${currentUser.myUserName}`}
            </Typography>
          </Grid>
          <Grid className="addpaddingclass">
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogoutClick}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default User;
