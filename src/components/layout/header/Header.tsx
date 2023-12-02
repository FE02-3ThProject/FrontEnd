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
  justify-content: center;
`;
