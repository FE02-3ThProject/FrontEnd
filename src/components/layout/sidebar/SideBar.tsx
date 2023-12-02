import React from "react";
import styled from "styled-components";

const SideBar = () => {
  return <StSideBar>SideBar</StSideBar>;
};

export default SideBar;

const StSideBar = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  height: 100%;
`;
