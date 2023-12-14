import { apiToken } from "../../shared/apis/Apis";
import { useQuery } from "react-query";

type Meeting = {
  id: number;
  title: string;
  description: string;
};
type Bookmark ={
  id: number;
  title: string;
  decription: string
}

const JoinedMeetingPage = () => {
  const getMyMeetingRoom = async () => {
    const res = await apiToken.get("/api/user-group/joined");
    return res;
  };
  const { data: meetingData, isLoading: meetingLoading } = useQuery(
    "MY_MEETINGS",
    getMyMeetingRoom
  );

  const getBookmark = async () => {
    const res = await apiToken.get(`/api/user-group/bookmark/{userId}`)
    return res;
  }
  const {data:bookmarkData, isLoading: bookmarkLoading} = useQuery(
    "MY_BOOKMARK",
    getBookmark
  );

  if (meetingLoading || bookmarkLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>
        <ul>
          {meetingData?.data.map((meeting: Meeting) => (
            <li key={meeting.id}>{meeting.title}</li>
          ))}
        </ul>
      </div>
      <div>
      <ul>
          {bookmarkData?.data.map((bookmark: Bookmark) => (
            <li key={bookmark.id}>{bookmark.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default JoinedMeetingPage;
