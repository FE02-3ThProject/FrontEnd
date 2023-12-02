import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import SideBar from "./sidebar/SideBar";
import Footer from "./footer/footer";
import styled from "styled-components";

const LayOut = () => {
  return (
    <StLayout>
      <Header />
      <StMainContents>
        <SideBar />
        <Outlet />
      </StMainContents>
      <Footer />
    </StLayout>
  );
};

export default LayOut;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StMainContents = styled.div`
  display: flex;
  justify-content: center;
`;
