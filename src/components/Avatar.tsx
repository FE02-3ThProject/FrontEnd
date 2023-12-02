import React from "react";
import styled from "styled-components";

interface AvatarProps {
  src: string | null | undefined;
}

const StImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <StImg alt="Avatar" src={src || "/images/placeholder.jpg"} />;
};

export default Avatar;
