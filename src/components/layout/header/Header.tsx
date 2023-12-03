import React from "react";
import styled from "styled-components";
import Navbar from "../../Navbar";

const Header = () => {
  return (
    <StHeader>
      <Navbar />
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  display: flex;
  position: fixed;
  z-index: 100;
  top: 0;
  justify-content: center;
`;
