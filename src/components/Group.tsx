import React from "react";
import { Button, Grid } from "@mui/material";
import AvatarImg from "./AvatarImg";

export type GroupProps = {
  id: number;
  name: string;
  avatar: string;
  onClick: () => void | null;
};

const Group: React.FC<GroupProps> = ({ id, name, avatar, onClick }) => {
  return (
    <Grid container className="group">
      <Grid sx={{ m: 2 }}>
        <Button onClick={onClick}>
          <AvatarImg img={avatar} isUserImg={false} id={id}></AvatarImg>
          <h4>{name}</h4>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Group;
