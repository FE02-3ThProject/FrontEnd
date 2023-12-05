import { useQuery } from "react-query";
import { apiToken } from "../../shared/apis/Apis";

const fetchMeeting = async (meetingId: number) => {
  const response = await apiToken.get(`/api주소/${meetingId}`); // 실제 API 주소를 사용하세요.
  return response.data;
};

const MeetingRoom = ({ meetingId }: { meetingId: number }) => {
  const {
    data: meeting,
    isLoading,
    error,
  } = useQuery(["meeting", meetingId], () => fetchMeeting(meetingId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.toString()}</div>;
  }

  return (
    <div>
      <h3>{meeting.title}</h3>
      <div>{meeting.description}</div>
    </div>
  );
};

export default MeetingRoom;
