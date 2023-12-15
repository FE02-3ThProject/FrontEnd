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

const getGroups = async () => {
  try {
    const response = await apiToken.get(`/api/group/all`);
    return response.data as Group[];
  } catch (error) {
    console.error(`Failed to fetch groups: ${error}`);
    return [];
  }
};

export default getGroups;
