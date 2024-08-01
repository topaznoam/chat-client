import React from "react";
import { Avatar, Button, Grid } from "@mui/material";

type GroupProps = {
  id: number;
  name: string;
  icon: string;
  onClick: () => void;
};

const Group: React.FC<GroupProps> = ({ id, name, icon, onClick }) => {
  return (
    <Grid container className="group">
      <Grid sx={{ m: 2 }}>
        <Button onClick={onClick}>
          <Avatar src={icon}></Avatar>
          <h4>{name}</h4>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Group;
