import styled from "styled-components";
import { BsArrowRightCircleFill } from "react-icons/bs";

import MainBottomBannerBg from "../../images/main/mainbottom_banner.png";
const MainBottomBanner = () => {
  return (
    <StMainBottomBanner>
      <StTextArea>
        <h2>About Us</h2>
        <p>
          야밤에 제육볶음이 먹고 싶은 사람이 디자인했습니다. <br /> 원하시는
          내용을 입력해주세요
        </p>

        <h4>당신의 지역 모임 커뮤니티</h4>
        <p>
          모모라서 가능한 모든 것, 같은 관심사를 가진 <br /> 이웃들을 만나
          다양한 정보와 이야기를 나눠보세요
        </p>
        <ul>
          <li>
            <BsArrowRightCircleFill /> 동네모임
          </li>
          <li>
            <BsArrowRightCircleFill /> 퇴근 후 소맥
          </li>
        </ul>
        <ul>
          <li>
            <BsArrowRightCircleFill /> 스터디모임
          </li>
          <li>
            <BsArrowRightCircleFill /> 취미 공유
          </li>
        </ul>
      </StTextArea>
    </StMainBottomBanner>
  );
};

export default MainBottomBanner;

const StMainBottomBanner = styled.div`
  width: 1200px;
  height: 658px;
  background-image: url(${MainBottomBannerBg});
`;

const StTextArea = styled.div`
  width: 360px;
  margin: 165px 0 0 800px;
  h2 {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  p {
    margin-top: 10px;
    line-height: 23px;
    color: #efefef;
    font-size: 14px;
  }
  h4 {
    color: #fff;
    font-size: 16px;
    margin-top: 70px;
    font-weight: bold;
  }
  ul {
    display: flex;
    margin-top: 18px;
    color: #fff;
  }
  li {
    width: 200px;
    font-weight: bold;
  }
`;
