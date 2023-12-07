import React from "react";
import styled from "styled-components";

interface MenuItemProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return <StMenuItem>{label}</StMenuItem>;
};

export default MenuItem;

const StMenuItem = styled.div`
  padding: 0.75rem 1rem;
  font-weight: 600;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;
  &:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(234 88 12 / var(--tw-bg-opacity));
  }
`;
