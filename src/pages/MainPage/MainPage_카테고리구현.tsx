import { useEffect, useState } from "react";
import MeetingCard from "../../components/Meetings/MeetingCard";
import MainSwiper from "../../components/Swiper/MainSwiper";
import styled from "styled-components";
import Mainbanner from "../../components/banner/Mainbanner";
import MainBottomBanner from "../../components/banner/MainBottomBanner";
import Categories from "../../components/categories/Categories_after";
import { apiToken } from "../../shared/apis/Apis";
import FloatingButton from "../../components/common/FloatingButton";

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

// MainPage component
const MainPage = () => {
  const [groups, setGroups] = useState<Group[]>([]); // 그룹 데이터를 저장할 상태
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // 선택된 카테고리를 저장할 상태

  // 선택된 카테고리에 해당하는 그룹 데이터를 조회하는 함수
  const fetchGroups = async (categoryId: number | null) => {
    try {
      const endpoint = categoryId
        ? `/api/group/category/${categoryId}`
        : "/api/group/all";
      const response = await apiToken.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      // 에러 처리 로직...
    }
  };

  useEffect(() => {
    // 카테고리가 선택되었을 때
    if (selectedCategory) {
      // 해당 카테고리의 그룹 데이터를 조회
      fetchGroups(selectedCategory).then(setGroups);
    } else {
      // 카테고리가 선택되지 않았을 때는 모든 그룹을 조회
      fetchGroups(null).then(setGroups);
    }
  }, [selectedCategory]);

  // 카테고리 선택 핸들러
  const handleCategorySelect = (value: number) => {
    setSelectedCategory(value);
  };

  return (
    <StContainer>
      <MainSwiper />
      <Categories onSelect={handleCategorySelect} />
      <StTitle>추천 모임</StTitle>
      <StCardContainer>
        {groups.slice(0, 7).map((group) => (
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
  margin: 30px 0 0 150px;
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
