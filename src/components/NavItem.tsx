import React from "react";
import MenuItem from "./MenuItem";
import styled from "styled-components";

const NavItem = () => {
  return (
    <StMenuList>
      <MenuItem label="Admin" />
      <MenuItem label="Chat" />
      <MenuItem label="Logout" />
    </StMenuList>
  );
};

export default NavItem;

const StMenuList = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 24vw;
  margin: 0 2rem 0 67.5vw;
  gap: 1rem;
`;
