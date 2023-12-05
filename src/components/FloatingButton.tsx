import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface IFloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const StLink = styled(Link)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: #0f78ee;
  border: none;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  aspect-ratio: 1;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 3.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0f52ee;
    color: #ffffff;
  }
`;

export default function FloatingButton({
  children,
  href,
}: IFloatingButtonProps) {
  return <StLink to={href}>{children}</StLink>;
}
