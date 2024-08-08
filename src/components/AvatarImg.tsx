import React, { useRef, useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";
import { updateGroupImageInServer } from "../api/GroupApiCliient";
import { updateUserImageInServer } from "../api/UserApiClient";

type AvatarImgProps = {
  id: number;
  img: string;
  isUserImg: boolean;
};
const AvatarImg: React.FC<AvatarImgProps> = (img: AvatarImgProps) => {
  const [imageSrc, setImageSrc] = useState<string>(img.img);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImageSrc(base64Image);
        img.isUserImg
          ? updateUserImageInServer(base64Image, img.id)
          : updateGroupImageInServer(base64Image, img.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Grid>
      <Button onClick={handleAvatarClick}>
        <Avatar src={imageSrc} />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </Grid>
  );
};

export default AvatarImg;
