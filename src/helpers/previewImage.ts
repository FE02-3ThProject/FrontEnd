import React from "react";

const previewImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
  setImage: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const file = e.target.files ? e.target.files[0] : null;
  setImage(file);
  const reader = new FileReader();
  reader.readAsDataURL(file as Blob);
  reader.onloadend = () => {
    setImagePreview(reader.result as string);
  };
};

export default previewImage;
