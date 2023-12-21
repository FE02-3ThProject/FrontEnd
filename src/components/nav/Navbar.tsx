import NavItem from "./NavItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "./Search";

import logo from "../../images/main/momo_logo_kr.png";
const Navbar = () => {
  return (
    <StNav>
      <StTop>
        <StTopSection>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <StLogo>
              <img src={logo} alt="모임?모임!" />
            </StLogo>
          </Link>
          <StSearch>
            <Search />
          </StSearch>
        </StTopSection>

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
  height: 62px;
  justify-content: space-between;
  z-index: 10;
  color: #fff;
  background-color: #ffffff;
  box-shadow: 0 3px 5px gray 80%;
`;

const StTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 /* 20px */;
`;
const StTopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
`;
const StLogo = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  font-size: 1.6rem /* 24px */;
  line-height: 2rem /* 32px */;
  height: 3.5rem /* 56px */;
  margin-left: 3rem;
  color: #1981f9;
  font-weight: 300;
  letter-spacing: -2px;
  span {
    font-size: 40px;
    font-weight: 300;
  }
  img {
    width: 125px;
  }
`;

const StSearch = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
`;
