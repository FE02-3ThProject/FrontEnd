import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import Notice from "../../components/post/Notice";
import styled from "styled-components";
import { Link } from "react-router-dom";

//Image Import
import MeetingImage from "../../images/MeetingRoom.jpg";

//Icons Import
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { getCookie } from "../../shared/Cookie";

//모임정보 불러오기
const fetchMeeting = async () => {
  const response = await apiToken.get(`/api/group/all`);
  return response.data;
};

//즐겨찾기 추가
const favoriteMeeting = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.post(`/api/bookmark/${parseInt(meetingId)}`);
  return response.data;
};

//즐겨찾기 삭제
const deleteFavorite = async (meetingId: string | undefined) => {
  const response = await apiToken.delete(
    `/api/user-group/unbookmark/${meetingId}`
  );
  return response.data;
};

//즐겨찾기 목록 불러오기
const fetchFavorite = async () => {
  const response = await apiToken.get(`/api/bookmark/group`);
  return response.data;
};

//모임 가입
const joinMeeting = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.post(
    `/api/group/${parseInt(meetingId)}/join`
  );
  return response.data;
};

//모임 탈퇴
const leaveMeeting = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.delete(
    `/api/group/${parseInt(meetingId)}/leave`
  );
  return response.data;
};

//가입한 모임 목록 불러오기
const fetchJoin = async () => {
  const response = await apiToken.get(`/api/user-group/joined`);
  return response.data;
};

//개시글 불러오기
const fetchPost = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided");
  }
  const response = await apiToken.get(
    `/api/group/${parseInt(meetingId) - 1}/post`
  );
  return response.data;
};

//공지사항 불러오기
const fetchNotice = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided");
  }
  const response = await apiToken.get(
    `/api/group/${parseInt(meetingId) - 1}/notice`
  );
  return response.data[0];
};

//모임 삭제
const deleteMeeting = async (meetingId: string | undefined) => {
  if (!meetingId) {
    throw new Error("Meeting ID is not provided");
  }
  const response = await apiToken.delete(
    `/api/group/delete/${parseInt(meetingId)}`
  );
  return response.data;
};

interface PostType {
  id: string;
  title: string;
  content: string;
  createAt: string;
}

const MeetingRoom = () => {
  const meetingId = useParams().meetingId as string;
  const meetingNumber = Number(meetingId) - 1;
  const queryClient = useQueryClient();

  const { data: meeting } = useQuery(["meeting"], () => fetchMeeting());
  const { data: favoriteMeetings } = useQuery(
    "favoriteMeetings",
    fetchFavorite
  );
  const { data: joinedMeetings } = useQuery("joinedMeetings", fetchJoin);
  const { data: posts } = useQuery<PostType[]>(["posts", meetingId], () =>
    fetchPost(meetingId)
  );
  const { data: notice } = useQuery(["notice", meetingId], () =>
    fetchNotice(meetingId)
  );

  const addFavoriteMutation = useMutation(favoriteMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("favoriteMeetings");
    },
  });

  const deleteFavoriteMutation = useMutation(deleteFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favoriteMeetings");
    },
  });

  const joinMeetingMutation = useMutation(joinMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("joinedMeetings");
    },
  });

  const leaveMeetingMutation = useMutation(leaveMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("joinedMeetings");
    },
  });

  const deleteMeetingMutation = useMutation(deleteMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries("meetings");
    },
  });

  const isFavorite = favoriteMeetings?.includes(meetingId);
  const isJoined = joinedMeetings?.includes(meetingId);
  const userId = getCookie("email");
  console.log(userId);
  console.log(meeting[meetingNumber]);
  return (
    <StContainer>
      <StForm>
        <StLeftForm>
          <StProfileSec>
            <StTitle>{meeting && meeting[meetingNumber].title}</StTitle>
            <StDesc>{meeting && meeting[meetingNumber].description}</StDesc>
            <StProfile>
              <StProfileImg src={MeetingImage} />
              <StProfileRight>
                <StNickName>빛이나는무계획</StNickName>
                <StProfileDesc>
                  <p>130/{meeting && meeting[meetingNumber]?.maxMembers}명</p>|
                  <p>개설일 {meeting && meeting[meetingNumber]?.createdAt}</p>
                </StProfileDesc>
              </StProfileRight>
            </StProfile>
            <StButtonSec>
              {meeting?.userId === userId && (
                <StButtonLine>
                  <Link to={`/meeting/${parseInt(meetingId)}/modification`}>
                    <StButton>모임 수정</StButton>
                  </Link>
                  <StButton
                    onClick={() => deleteMeetingMutation.mutate(meetingId)}
                  >
                    모임 삭제
                  </StButton>
                </StButtonLine>
              )}
              <StButtonLine>
                {isFavorite ? (
                  <StButton
                    onClick={() => deleteFavoriteMutation.mutate(meetingId)}
                  >
                    <FaHeart />
                    즐겨찾기 해제
                  </StButton>
                ) : (
                  <StButton
                    onClick={() => addFavoriteMutation.mutate(meetingId)}
                  >
                    <FaRegHeart />
                    즐겨찾기
                  </StButton>
                )}
                {isJoined ? (
                  <StButton
                    onClick={() => leaveMeetingMutation.mutate(meetingId)}
                  >
                    <FaHeart /> 탈퇴하기
                  </StButton>
                ) : (
                  <StButton
                    onClick={() => joinMeetingMutation.mutate(meetingId)}
                  >
                    <FaRegHeart /> 참여하기
                  </StButton>
                )}
              </StButtonLine>
            </StButtonSec>
          </StProfileSec>
        </StLeftForm>
        <StRightForm>
          <StNotice>{notice && <Notice data={notice} />}</StNotice>
          <StPost>
            {posts?.slice(0, 10).map((post) => (
              <Post key={post.id} data={post} />
            ))}
          </StPost>
          <StPostButtonSec>
            <Link to={`/meeting/${parseInt(meetingId)}/createpost`}>
              <StPostButton>게시글 작성</StPostButton>
            </Link>
          </StPostButtonSec>
        </StRightForm>
      </StForm>
    </StContainer>
  );
};

export default MeetingRoom;

const StContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.div`
  display: flex;
  width: 1100px;
  height: 630px;
  border-radius: 30px;
  box-shadow: 11px 13px 4px 0px #0000001a;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: white;
`;

const StLeftForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  width: 460px;
  height: 630px;
  border-radius: 30px;
  background-image: url(${MeetingImage});
  background-size: cover;
  background-position: center;
`;

const StProfileSec = styled.div`
  margin: 0 auto;
`;

const StTitle = styled.h2`
  color: #ffffff;
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const StDesc = styled.p`
  width: 350px;
  height: auto;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 40px;
`;

const StProfile = styled.div`
  color: #ffffff;
  display: flex;
  margin-bottom: 30px;
`;

const StProfileImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const StProfileRight = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const StNickName = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StProfileDesc = styled.div`
  display: flex;
  gap: 10px;
`;

const StButtonSec = styled.div`
  width: 394px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-direction: column;
`;

const StButtonLine = styled.div`
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const StButton = styled.button`
  width: 187px;
  height: 35px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const StPostButton = styled.button`
  width: 150px;
  height: 35px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;

const StRightForm = styled.div`
  width: 640px;
  height: 630px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const StNotice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: 60px;
  border-bottom: 1px solid gray;
`;

const StPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid lightgray;
  width: 600px;
  height: 500px;
  border-radius: 10px;
  margin-top: 10px;
`;

const StPostButtonSec = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 50px;
  margin-top: 10px;
`;
