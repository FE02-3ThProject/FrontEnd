import NavItem from "./NavItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <StNav>
      <StTop>
        <StTopSection>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <StLogo>
              모임?<span>모임!</span>
            </StLogo>
          </Link>
          <StSearch>
            <StInput type="text" placeholder="어떤 모임을 찾고계신가요?" />
          </StSearch>
          <StSearchIcon>
            <CiSearch />
          </StSearchIcon>
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
  margin-top: 8px;
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
`;

const StSearch = styled.div``;

const StInput = styled.input`
  width: 200px;
  height: 25px;
  border-radius: 15px;
  padding-left: 15px;
  margin-left: 10px;
  background-color: #fff;
  border: 1px solid #0f78ee;
  color: #0f78ee;
  outline: none;
  &::placeholder {
    color: #0f78ee;
  }
`;

const StSearchIcon = styled.div`
  color: #0f78ee;
  font-size: 20px;
  font-weight: bold;
  margin-left: -30px;
`;
