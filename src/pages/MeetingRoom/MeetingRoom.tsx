import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import Notice from "../../components/post/Notice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";

//Icons Import
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Pencil from "../../images/meeting/pencil-line_1.png";
import Trash from "../../images/meeting/trash-2_1.png";

//image import
import basicImage from "../../images/default_profile.png";
import Banner from "../../images/meeting/Group-559.png";

//모임 상세조회 불러오기
const fetchDetails = async (groupId: string | undefined) => {
  const response = await apiToken.get(`/api/group/detail/${groupId}`);
  return response.data;
};

//즐겨찾기 추가 & 삭제
const addFavorite = async (groupId: string | undefined) => {
  if (!groupId) {
    throw new Error("Meeting Id is not provided.");
  }
  const response = await apiToken.post(`/api/bookmark/${parseInt(groupId)}`);
  return response.data;
};

//즐겨찾기 목록 불러오기
const fetchFavorite = async (userId: string | undefined) => {
  const response = await apiToken.get(`/api/user-group/bookmark/${userId}`);
  return response.data;
};

//모임 가입
const joinMeeting = async (groupId: string | undefined) => {
  if (!groupId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.post(`/api/group/${parseInt(groupId)}/join`);
  return response.data;
};

//모임 탈퇴
const leaveMeeting = async (groupId: string | undefined) => {
  if (!groupId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.delete(
    `/api/group/${parseInt(groupId)}/leave`
  );
  return response.data;
};

//가입한 모임 목록 불러오기
const fetchJoin = async () => {
  const response = await apiToken.get(`/api/user-group/joined`);
  return response.data;
};

//개시글 불러오기
const fetchPost = async (groupId: string | undefined) => {
  if (!groupId) {
    throw new Error("Group ID is not provided");
  }
  const response = await apiToken.get(`/api/group/${parseInt(groupId)}/post`);
  return response.data;
};

//공지사항 불러오기
const fetchNotice = async (groupId: string | undefined) => {
  if (!groupId) {
    throw new Error("Group ID is not provided");
  }
  const response = await apiToken.get(`/api/group/${parseInt(groupId)}/notice`);
  const notices = response.data;

  if (notices.length === 0) {
    throw new Error("No notices found for the group.");
  }

  const latestNotice = notices[notices.length - 1];
  return latestNotice;
};

//모임 삭제
const deleteMeeting = async (groupId: string | undefined) => {
  if (!groupId) {
    throw new Error("Meeting ID is not provided");
  }
  const response = await apiToken.delete(
    `/api/group/delete/${parseInt(groupId)}`
  );
  return response.data;
};

//모임 맴버조회
const fetchMembers = async (groupId: string | undefined) => {
  const response = await apiToken.get(`api/group/groupMembers/${groupId}`);
  return response.data;
};

interface PostType {
  postId: string;
  id: string;
  title: string;
  content: string;
  createAt: string;
}

interface StLeftFormProps {
  MeetingImage?: string;
}

const MeetingRoom = () => {
  const meetingId = useParams().meetingId as string;
  const queryClient = useQueryClient();
  const userId = getCookie("email");
  const navigate = useNavigate();
  const groupId = meetingId;

  const { data: meeting } = useQuery(
    ["meeting", groupId],
    () => fetchDetails(groupId),
    { enabled: !!groupId }
  );
  const { data: favoriteMeetings } = useQuery(["favoriteMeetings"], () =>
    fetchFavorite(userId)
  );
  const { data: joinedMeetings } = useQuery(["joinedMeetings"], () =>
    fetchJoin()
  );
  const { data: posts } = useQuery<PostType[]>(
    ["posts", groupId],
    () => fetchPost(groupId),
    { enabled: !!groupId }
  );
  const { data: notice } = useQuery(
    ["notice", groupId],
    () => fetchNotice(groupId),
    { enabled: !!groupId }
  );

  const { data: members } = useQuery(
    ["members", groupId],
    () => fetchMembers(groupId),
    { enabled: !!groupId }
  );

  console.log(members);
  console.log(meeting);

  const addFavoriteMutation = useMutation(addFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favoriteMeetings");
    },
  });

  const deleteFavoriteMutation = useMutation(addFavorite, {
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
      navigate(`/`);
    },
  });

  const isFavorite = favoriteMeetings?.includes(groupId);
  const isJoined = joinedMeetings?.includes(groupId);
  const MeetingImage = meeting && meeting.image;

  return (
    <StContainer>
      <StForm>
        <StLeftForm MeetingImage={MeetingImage}>
          <StProfileSec>
            <StTitle>{meeting && meeting.title}</StTitle>
            <StDesc>{meeting && meeting.description}</StDesc>
            <StProfile>
              {meeting?.leaderProfilePictrue === !null ? (
                <StProfileImg src={meeting && meeting?.leaderProfilePicture} />
              ) : (
                <StProfileImg src={basicImage} />
              )}
              <StProfileRight>
                <StNickName>{meeting && meeting?.leaderNickname}</StNickName>
                <StProfileDesc>
                  <p>
                    {meeting && meeting?.joinedGroupMembers}/
                    {meeting && meeting?.maxMembers}명
                  </p>
                  |<p>개설일 {meeting && meeting?.createdAt}</p>
                </StProfileDesc>
              </StProfileRight>
            </StProfile>
            <StButtonSec>
              {meeting?.leaderEmail === userId && (
                <StButtonLine>
                  <Link to={`/meeting/${parseInt(groupId)}/modification`}>
                    <StSmButton>
                      <img src={Pencil} />
                      수정
                    </StSmButton>
                  </Link>
                  <StSmButton
                    onClick={() => deleteMeetingMutation.mutate(groupId)}
                  >
                    <img src={Trash} />
                    삭제
                  </StSmButton>
                  <Link to={`/meeting/${parseInt(groupId)}/members`}>
                    <StSmButton>맴버 관리</StSmButton>
                  </Link>
                </StButtonLine>
              )}
              <StButtonLine>
                {isFavorite ? (
                  <StButton
                    onClick={() => deleteFavoriteMutation.mutate(groupId)}
                  >
                    <FaHeart />
                    즐겨찾기 해제
                  </StButton>
                ) : (
                  <StButton onClick={() => addFavoriteMutation.mutate(groupId)}>
                    <FaRegHeart />
                    즐겨찾기
                  </StButton>
                )}
                {isJoined ? (
                  <StButton
                    onClick={() => leaveMeetingMutation.mutate(groupId)}
                  >
                    <FaHeart /> 탈퇴하기
                  </StButton>
                ) : (
                  <StButton onClick={() => joinMeetingMutation.mutate(groupId)}>
                    <FaRegHeart /> 참여하기
                  </StButton>
                )}
              </StButtonLine>
            </StButtonSec>
          </StProfileSec>
        </StLeftForm>
        <StRightForm>
          <StRightContainer>
            <StNotice>
              {notice ? (
                <Link
                  to={`/meeting/${groupId}/${
                    notice && notice.noticeIdx
                  }/notice`}
                >
                  {notice && <Notice data={notice} />}
                </Link>
              ) : (
                <StEmptyNotice>공지사항이 없습니다.</StEmptyNotice>
              )}
            </StNotice>
            {isJoined ? (
              <>
                <StPost>
                  {posts?.slice(0, 10).map((post) => (
                    <Link to={`/meeting/${groupId}/${post.postId}/post`}>
                      <Post key={post.id} data={post} />
                    </Link>
                  ))}
                </StPost>
                <StPostButtonSec>
                  <Link to={`/meeting/${parseInt(meetingId)}/createpost`}>
                    <StPostButton>게시글 작성</StPostButton>
                  </Link>
                </StPostButtonSec>
              </>
            ) : (
              <StFalseJoin>
                <p>게시판 및 채팅방</p>
                <p>이용은 가입 후</p>
                <p>사용가능합니다</p>
              </StFalseJoin>
            )}
          </StRightContainer>
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
  background-image: url(${Banner});
  background-size: cover;
  background-position: center;
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

const StLeftForm = styled.div<StLeftFormProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 460px;
  height: 630px;
  border-radius: 30px;
  background-color: gray;
  background-image: url(${(props) => props.MeetingImage});
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
  gap: 10px;
`;

const StSmButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
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
  justify-content: center;
  align-items: center;
`;

const StRightContainer = styled.div`
  width: 566px;
  height: 544px;
  background-color: #e0e0e0;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StNotice = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 90%;
  height: 240px;
  color: black;
  border-bottom: 2px solid white;
`;

const StPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 250px;
  margin-top: 10px;
`;

const StFalseJoin = styled.div`
  width: 60%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 44px;
  font-weight: 700;
  line-height: 55px;
  color: white;
`;

const StEmptyNotice = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 44px;
  font-weight: 700;
  color: white;
`;

const StPostButtonSec = styled.div`
  width: 90%;
  display: flex;
  justify-content: end;
  margin-right: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
