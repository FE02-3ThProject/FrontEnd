import { useParams } from "react-router-dom";
import { apiToken } from "../../shared/apis/Apis";
import { useQuery } from "react-query";

//모임정보 불러오기
const fetchMeeting = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.get(`/api/group/${parseInt(meetingId)}`);
  return response.data;
};

const MeetingModificationPage = () => {
  const meetingId = useParams().meetingId as string;
  const { data: meeting } = useQuery(["meeting", meetingId], () =>
    fetchMeeting(meetingId)
  );
  return <div></div>;
};

export default MeetingModificationPage;
