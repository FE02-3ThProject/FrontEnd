import { useState } from "react";
import NavItem from "./NavItem";
import styled from "styled-components";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <StNav>
      <StTop>
        <StLogo>logo</StLogo>
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
  justify-content: space-between;
  z-index: 10;
  /* width: 100vw; */
  color: #fff;
  background-color: #ff8400;
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
  width: 50px;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  height: 3.5rem /* 56px */;
  padding-left: 3rem;
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
