import { AxiosResponse } from "axios";
import Loading from "../../components/loading/Loading";
import { getCookie } from "../../shared/Cookie";
import { apiToken } from "../../shared/apis/Apis";
import { useQuery } from "react-query";
import MyMeetingCard from "../../components/MyMeeting/MyMeetingCard";
import styled from "styled-components";

interface Meeting {
  groupId: number;
  locationName: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
  maxMembers: 123;
  createdAt: string;
  leaderEmail: string;
  joinedGroupMembers: number;
}

const MyCreatedMeeting = () => {
  const userEmail = getCookie("email");

  const getMyMeetingRoom = async () => {
    const res = await apiToken.get("/api/group/all");
    return res;
  };
  const { data: meetingData, isLoading: meetingLoading } = useQuery<
    AxiosResponse<Meeting[]>
  >("MY_MEETINGS", getMyMeetingRoom);
  console.log(meetingData);

  if (meetingLoading) {
    return <Loading />;
  }

  return (
    <>
      <StMeetingCard>
        {/* {meetingData?.data
          .filter((data) => data.leaderEmail === userEmail) // leaderEmail과 userEmail이 같은 데이터만 선택
          .map((data) => (
            <MyMeetingCard key={data.groupId} data={data} />
          ))}    */}
        {meetingData?.data.map((data) => (
          <MyMeetingCard key={data.groupId} data={data} />
        ))}
      </StMeetingCard>
    </>
  );
};

export default MyCreatedMeeting;

const StMeetingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;
