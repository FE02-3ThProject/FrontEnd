import { apiToken } from "../shared/apis/Apis";

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

const getGroups = async (category: string | null = null) => {
  // category 인자 추가
  try {
    let response;
    if (category) {
      // 카테고리가 선택된 경우, 해당 카테고리에 맞는 그룹 데이터를 반환하도록 API를 호출
      response = await apiToken.get(`/api/group/all?category=${category}`);
    } else {
      // 카테고리가 선택되지 않은 경우, 모든 그룹 데이터를 반환하도록 API를 호출
      response = await apiToken.get("/api/group/all");
    }
    return response.data as Group[];
  } catch (error) {
    console.error(`Failed to fetch groups: ${error}`);
    return [];
  }
};

export default getGroups;
