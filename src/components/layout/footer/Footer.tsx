import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StFooter>
      <StContainer>
        <StContents>Copyright © Project02. All Rights Reserved.</StContents>
      </StContainer>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const StContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px;
`;

const StContents = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  color: rgb(188, 152, 108);
`;
