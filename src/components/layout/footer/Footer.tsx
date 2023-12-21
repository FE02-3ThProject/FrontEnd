import styled from "styled-components";

import Logo from "../../../images/W_momo_logo_kr.png";
import Instagram from "../../../images/Instagram.png";
import Facebook from "../../../images/Facebook.png";
import Youtube from "../../../images/youtube.png";
import KakaoTalk from "../../../images/kakaotalk.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <StFooter>
      <StLogo src={Logo} />
      <StContent>
        <span>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </span>
        <span>
          <Link
            to="additional"
            style={{ textDecoration: "none", color: "white" }}
          >
            모임만들기
          </Link>
        </span>
        <span>
          <Link
            to="mypage/:id"
            style={{ textDecoration: "none", color: "white" }}
          >
            내정보
          </Link>
        </span>
        <span>
          <Link
            to="https://github.com/FE02-3ThProject/FrontEnd/tree/develop"
            style={{ textDecoration: "none", color: "white" }}
            target="_blank"
          >
            Contanct US
          </Link>
        </span>
      </StContent>
      <StIcons>
        <Link
          to="https://www.instagram.com/"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
        >
          <img src={Instagram} />
        </Link>
        <Link
          to="https://www.facebook.com/?locale=ko_KR"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
        >
          <img src={Facebook} />
        </Link>
        <Link
          to="https://www.youtube.com/"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
        >
          <img src={Youtube} />
        </Link>
        <Link
          to="https://www.kakaocorp.com/page/"
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
        >
          <img src={KakaoTalk} />
        </Link>
      </StIcons>
      <StCopyright>Copyright 2024.Super 02. All right reserved.</StCopyright>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  width: 100vw;
  height: 329px;
  background-color: #283646;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StLogo = styled.img`
  padding-top: 40px;
  width: 180px;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const StContent = styled.div`
  color: white;
  width: 600px;
  display: flex;
  justify-content: space-evenly;
`;

const StIcons = styled.div`
  margin-top: 30px;
  width: 400px;
  display: flex;
  justify-content: space-evenly;
`;

const StCopyright = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 60px;
  margin-bottom: 40px;
  padding-top: 20px;
  border-top: 1px solid #76aeff;
`;
