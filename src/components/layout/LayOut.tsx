import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
