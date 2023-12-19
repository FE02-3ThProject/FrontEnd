import { useEffect, useState } from "react";
import FloatingButton from "../../components/common/FloatingButton";
import MainSwiper from "../../components/Swiper/MainSwiper";
import Categories from "../../components/categories/Categories_before";
import styled from "styled-components";
import Mainbanner from "../../components/banner/Mainbanner";
import MainBottomBanner from "../../components/banner/MainBottomBanner";
import getGroups from "../../actions/getGroups";
import MainSubSwiper from "../../components/Swiper/MainSubSwiper";

interface Group {
  groupId: string;
  locationName: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
  maxMembers: number;
  createdAt: string;
  userId: string;
}

const MainPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      const data = await getGroups();
      if (data) setGroups(data);
    };

    loadGroups();
  }, []);

  return (
    <StContainer>
      <MainSwiper />
      <Categories />
      <StTitle>추천 모임</StTitle>
      <StCardContainer>
        <MainSubSwiper groups={groups} />
      </StCardContainer>
      <StBannerContainer>
        <Mainbanner />
      </StBannerContainer>
      <StBBannerContainer>
        <MainBottomBanner />
      </StBBannerContainer>
      <FloatingButton href="additional">+</FloatingButton>
    </StContainer>
  );
};

export default MainPage;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const StCardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  flex-wrap: wrap;

  /* @media (min-width: 640px) {
    .sm\:mx-10 {
      min-width: 640px;
      margin-left: 2.5rem;
      margin-right: 2.5rem;
    }
  } */
`;

const StTitle = styled.div`
  margin: 30px 0 0 70px;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -1px;
`;

const StBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 0 0 0;
`;
const StBBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 70px 0;
`;
