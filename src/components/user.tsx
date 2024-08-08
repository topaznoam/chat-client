import React from "react";
import { Avatar, Grid, Checkbox } from "@mui/material";
import AvatarImg from "./AvatarImg";

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
      <AvatarImg img={icon} isUserImg={true} id={id}></AvatarImg>
      <h4>{name}</h4>
    </Grid>
  );
};

export default User;
