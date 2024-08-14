import React, { useState } from "react";
import { Avatar, Button, Grid, Dialog } from "@mui/material";

type StaticAvatarImgProps = {
  img: string;
};

const StaticAvatarImg: React.FC<StaticAvatarImgProps> = ({ img }) => {
  const [open, setOpen] = useState(false);

  const handleAvatarClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Button onClick={handleAvatarClick}>
        <Avatar src={img} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <img src={img} alt="Avatar" />
      </Dialog>
    </Grid>
  );
};

export default StaticAvatarImg;
