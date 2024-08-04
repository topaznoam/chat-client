import React from "react";
import { Avatar, Button, Grid } from "@mui/material";

export type GroupProps = {
  id: number;
  name: string;
  avatar: string;
  onClick: () => void;
};

const Group: React.FC<GroupProps> = ({ name, avatar, onClick }) => {
  return (
    <Grid container className="group">
      <Grid sx={{ m: 2 }}>
        <Button onClick={onClick}>
          <Avatar src={avatar} />
          <h4>{name}</h4>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Group;
