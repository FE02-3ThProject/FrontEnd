import { useEffect, useState } from "react";
import FloatingButton from "../../components/common/FloatingButton";
import MeetingCard from "../../components/Meetings/MeetingCard";
import MainSwiper from "../../components/Swiper/MainSwiper";
import styled from "styled-components";
import Mainbanner from "../../components/banner/Mainbanner";
import MainBottomBanner from "../../components/banner/MainBottomBanner";
import getGroups from "../../actions/getGroups";
import Categories from "../../components/categories/Categories_after";

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

  const [category, setCategory] = useState<string | null>(null); // 카테고리 선택

  const handleCategorySelect = (category: string) => {
    // 추가
    setCategory(category);
  };

  useEffect(() => {
    const loadGroups = async () => {
      const data = await getGroups(category); // 카테고리에 따라 그룹을 가져오는 로직으로 수정
      if (data) setGroups(data);
    };

    loadGroups();
  }, [category]); // 카테고리가 변경될 때마다 그룹을 다시 로드하도록 수정

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
      <Categories onCategorySelect={handleCategorySelect} />
      <StTitle>추천 모임</StTitle>
      <StCardContainer>
        {groups.map((group) => (
          <MeetingCard key={group.groupId} group={group} />
        ))}
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
