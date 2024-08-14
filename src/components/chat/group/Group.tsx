import React from "react";
import { Button, Grid } from "@mui/material";
import AvatarImg from "../avatars/AvatarImg";

export type GroupProps = {
  id: number;
  name: string;
  avatar: string;
  onClick: () => void | null;
};

const Group: React.FC<GroupProps> = ({ id, name, avatar, onClick }) => {
  return (
    <Grid className="group">
      <Button className="groupButton" onClick={onClick}>
        <Grid container>
          <AvatarImg img={avatar} isUserImg={false} id={id}></AvatarImg>
          <h4>{name}</h4>
        </Grid>
      </Button>
    </Grid>
  );
};

export default Group;
