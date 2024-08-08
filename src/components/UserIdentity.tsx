import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import AvatarImg from "./AvatarImg";
import { currentUserId, resetglobals } from "../globalvaryables";
import { useNavigate } from "react-router-dom";

import BlockPage from "./BlockPage";

export type selfUserProps = {
  myAvatar: string | null;
  myUserName: string | null;
};

const User: React.FC<selfUserProps> = (user: selfUserProps) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    resetglobals();
    navigate("/login");
  };

  return (
    <Grid>
      {currentUserId ? (
        <Paper sx={{ mr: 2 }}>
          <Grid item>
            {user.myAvatar ? (
              <AvatarImg
                img={user.myAvatar}
                isUserImg={true}
                id={currentUserId}
              />
            ) : null}

            <Typography variant="h4" sx={{ m: 1 }}>
              {`Welcome back ${user.myUserName}`}
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
      ) : (
        <BlockPage />
      )}
    </Grid>
  );
};

export default User;
