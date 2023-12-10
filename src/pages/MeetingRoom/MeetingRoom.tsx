import { useQuery } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { useParams } from "react-router-dom";

const fetchMeeting = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.get(`/api/group/${parseInt(meetingId)}`);
  return response.data;
};

const MeetingRoom = () => {
  const meetingId = useParams();
  console.log(meetingId.id);
  const {
    data: meeting,
    isLoading,
    error,
  } = useQuery(["meeting", meetingId], () => fetchMeeting(meetingId.id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.toString()}</div>;
  }

  return <div>{meeting.title}</div>;
};

export default MeetingRoom;
