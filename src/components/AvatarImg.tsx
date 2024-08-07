import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { ICON } from "../Constants";

const AvatarImg: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>(ICON);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        console.log(imageSrc);
      };

      console.log(reader.readAsDataURL(file));
    }
  };

  return (
    <div>
      <Button onClick={() => document.getElementById("fileInput")?.click()}>
        <Avatar src={imageSrc} />
      </Button>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </div>
  );
};

export default AvatarImg;
