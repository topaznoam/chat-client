import React from "react";
import { Avatar, Grid, Checkbox } from "@mui/material";

export type UserProps = {
  id: number;
  name: string;
  icon: string;
  checkbox: boolean;
};

const User: React.FC<UserProps> = ({ id, name, icon, checkbox }) => {
  return (
    <Grid className="user" sx={{ m: 2 }}>
      <Checkbox disabled={checkbox} />
      <Avatar src={icon}></Avatar>
      <h4>{name}</h4>
    </Grid>
  );
};

export default User;
