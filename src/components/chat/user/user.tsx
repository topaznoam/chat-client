import React from "react";
import { Grid, Checkbox } from "@mui/material";
import StaticAvatarImg from "../avatars/StaticAvatarImg";

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
    <Grid className="user">
      <Checkbox checked={checkbox} onChange={() => onCheckboxChange(id)} />
      <StaticAvatarImg img={icon} />
      <h4>{name}</h4>
    </Grid>
  );
};

export default User;
