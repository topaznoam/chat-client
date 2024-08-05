import React from "react";
import { Avatar, Grid, Checkbox } from "@mui/material";

export type UserProps = {
  id: number;
  name: string;
  icon: string;
  checkbox: boolean;
  onCheckboxChange: (id: number) => void;
};

const User: React.FC<UserProps> = ({
  id,
  name,
  icon,
  checkbox,
  onCheckboxChange,
}) => {
  return (
    <Grid className="user" sx={{ m: 2 }}>
      <Checkbox checked={checkbox} onChange={() => onCheckboxChange(id)} />
      <Avatar src={icon}></Avatar>
      <h4>{name}</h4>
    </Grid>
  );
};

export default User;
