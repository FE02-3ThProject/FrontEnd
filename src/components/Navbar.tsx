import { useState } from "react";
import NavItem from "./NavItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <StNav>
      <StTop>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <StLogo>모임?모임!</StLogo>
        </Link>
        <StSearch>
          <StInput type="text" placeholder="어떤 모임을 찾고계신가요?" />
        </StSearch>
        <StSearchIcon>
          <CiSearch />
        </StSearchIcon>
        <StMenu>
          {menu === false ? (
            <StMenuButton onClick={handleMenu}>+</StMenuButton>
          ) : (
            <StMenuButton onClick={handleMenu}>-</StMenuButton>
          )}
        </StMenu>

        {/* nav-items large screen*/}
        <div>
          <NavItem />
        </div>
      </StTop>
    </StNav>
  );
};

export default Navbar;

const StNav = styled.div`
  position: relative;
  width: 100vw;
  justify-content: space-between;
  z-index: 10;
  /* width: 100vw; */
  color: #fff;
  background-color: #ffffff;
`;

const StTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 /* 20px */;

  /*
  @media (min-width: 640px) {
    .sm\:mx-10 {
      margin-left: 2.5rem ;
      margin-right: 2.5rem;
    }
  }
  @media (min-width: 1024px) {
    .lg\:mx-20 {
      margin-left: 5rem ;
      margin-right: 5rem;
    }
  }
  */
`;

const StLogo = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  height: 3.5rem /* 56px */;
  margin-left: 3rem;
  color: #0f78ee;
  font-weight: 900;
`;

const StMenu = styled.div`
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  width: 50px;
  @media (min-width: 640px) {
    .sm\:hidden {
      display: none;
    }
  }
  background-color: transparent;
`;

const StMenuButton = styled.button`
  background-color: transparent;
  color: #fff;
`;

const StSearch = styled.div`
  margin-left: -730px;
`;

const StInput = styled.input`
  width: 200px;
  height: 25px;
  border-radius: 15px;
  padding-left: 15px;
  background-color: #0f78ee;
  border: 1px solid #0f78ee;
  color: #fff;
  outline: none;
  &::placeholder {
    color: #fff;
    opacity: 70%;
  }
`;

const StSearchIcon = styled.div`
  margin-left: -760px;
`;
