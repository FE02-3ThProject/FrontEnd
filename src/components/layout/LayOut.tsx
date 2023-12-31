import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const LayOut = () => {
  return (
    <StLayout>
      <Header />
      <Outlet />
      <Footer />
    </StLayout>
  );
};

export default LayOut;

const StLayout = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
`;
