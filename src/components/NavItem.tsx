import { Link } from "react-router-dom";
// import MenuItem from "./MenuItem";
import styled from "styled-components";
import StButton from "./Button";
import StButtonW from "./ButtonW";

const NavItem = () => {
  return (
    <StMenuList>
      <Link to="login" style={{ textDecoration: "none", color: "white" }}>
        <StButton label="login" />
      </Link>
      <Link to="signup" style={{ textDecoration: "none", color: "white" }}>
        <StButtonW label="register" />
      </Link>
      {/* <Link to="mypage/:id" style={{ textDecoration: "none", color: "white" }}>
        <MenuItem label="Admin" />
      </Link>
      <Link
        to="chating/:roomId"
        style={{ textDecoration: "none", color: "white" }}
      >
        <MenuItem label="Chat" />
      </Link>
      <Link to="meeting/:id" style={{ textDecoration: "none", color: "white" }}>
        <MenuItem label="Meeting" />
      </Link>
      <Link to="login" style={{ textDecoration: "none", color: "white" }}>
        <MenuItem label="Login" />
      </Link> */}
    </StMenuList>
  );
};

export default NavItem;

const StMenuList = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  /* width: 24vw; */
  margin: 0 2rem 0 0;
  gap: 1rem;
`;
