import React from "react";
import styled from "styled-components";

import Logo from "../../../../public/images/W_momo_logo_kr.png";
import Instagram from "../../../../public/images/Instagram.png";
import Facebook from "../../../../public/images/Facebook.png";
import Youtube from "../../../../public/images/youtube.png";
import KakaoTalk from "../../../../public/images/kakaotalk.png";

const Footer = () => {
  return (
    <StFooter>
      <StLogo src={Logo} />
      <StContent>
        <span>Home</span>
        <span>About</span>
        <span>Service A</span>
        <span>Service B</span>
        <span>Contanct US</span>
      </StContent>
      <StIcons>
        <img src={Instagram} />
        <img src={Facebook} />
        <img src={Youtube} />
        <img src={KakaoTalk} />
      </StIcons>
      <StCopyright>Copyright 2024.Super 02. All right reserved.</StCopyright>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  width: 1920px;
  height: 329px;
  background-color: #283646;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1750px;
  flex-direction: column;
`;

const StLogo = styled.img`
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
  width: 1700px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid white;
`;
