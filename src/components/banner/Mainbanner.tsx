import styled from "styled-components";

//img Import
import mainbanner01 from "../../images/main/mainbanner01.png";
import mainbanner02 from "../../images/main/mainbanner02.png";
import mainbanner03 from "../../images/main/mainbanner03.png";
import mainbanner04 from "../../images/main/mainbanner04.png";

const Mainbanner = () => {
  return (
    <StMainBannerContainer>
      <StMainBannerLeft>
        <img src={mainbanner01} alt="메인프로젝트01" />
      </StMainBannerLeft>
      <StMainBannerRight>
        <StMBRTop>
          <img src={mainbanner02} alt="메인프로젝트02" />
          <img src={mainbanner03} alt="메인프로젝트03" />
        </StMBRTop>
        <StMBRBottom>
          <img src={mainbanner04} alt="메인프로젝트04" />
        </StMBRBottom>
      </StMainBannerRight>
    </StMainBannerContainer>
  );
};

export default Mainbanner;

const StMainBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  gap: 3px;
`;

const StMainBannerLeft = styled.div`
  width: 833px;
  height: 433px;
`;

const StMainBannerRight = styled.div`
  gap: 5px;
`;

const StMBRTop = styled.div`
  img:first-child {
    margin: 0 9px 8px 0;
  }
  img:last-child {
    margin: 0 0 8px 0;
  }
`;

const StMBRBottom = styled.div``;
