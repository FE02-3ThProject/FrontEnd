import { useQuery, useMutation, useQueryClient } from "react-query";
import { apiToken } from "../../shared/apis/Apis";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import Notice from "../../components/post/Notice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

//Icons Import
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Pencil from "../../images/meeting/pencil-line_1.png";
import Trash from "../../images/meeting/trash-2_1.png";
import Edit from "../../images/meeting/circle-user-round.png";

//image import
import Banner from "../../images/meeting/Group-559.png";

//모임 상세조회 불러오기
const fetchDetails = async (groupId: number | undefined) => {
  const response = await apiToken.get(`/api/group/detail/${groupId}`);
  return response.data;
};

//즐겨찾기 추가 & 삭제
const addFavorite = async (groupId: number | undefined) => {
  if (!groupId) {
    throw new Error("Meeting Id is not provided.");
  }
  const response = await apiToken.post(`/api/bookmark/${groupId}`);
  return response.data;
};

const fetchFavorite = async () => {
  const response = await apiToken.get(`/api/user/bookmarked`);
  return response.data;
};

//모임 가입
const joinMeeting = async (groupId: number | undefined) => {
  if (!groupId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.post(`/api/group/${groupId}/join`);
  return response.data;
};

//모임 탈퇴
const leaveMeeting = async (groupId: number | undefined) => {
  if (!groupId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.post(`/api/group/${groupId}/leave`);
  return response.data;
};

const fetchJoin = async () => {
  const response = await apiToken.get(`/api/user/joined`);
  return response.data;
};

//개시글 불러오기
const fetchPost = async (groupId: number | undefined) => {
  if (!groupId) {
    throw new Error("Group ID is not provided");
  }
  const response = await apiToken.get(`/api/group/${groupId}/post`);
  return response.data;
};

//공지사항 불러오기
const fetchNotice = async (groupId: number | undefined) => {
  if (!groupId) {
    throw new Error("Group ID is not provided");
  }
  const response = await apiToken.get(`/api/group/${groupId}/notice`);
  const notices = response.data;

  if (notices.length === 0) {
    throw new Error("No notices found for the group.");
  }

  const latestNotice = notices[notices.length - 1];
  return latestNotice;
};

//모임 삭제
const deleteMeeting = async (groupId: number | undefined) => {
  if (!groupId) {
    throw new Error("Meeting ID is not provided");
  }
  const response = await apiToken.delete(`/api/group/delete/${groupId}`);
  return response.data;
};

interface PostType {
  postId: string;
  id: string;
  title: string;
  content: string;
  postedAt: string;
  email: string;
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
    () => fetchDetails(Number(groupId)),
    { enabled: !!groupId }
  );
  const { data: favoriteMeetings } = useQuery(["favoriteMeetings"], () =>
    fetchFavorite()
  );
  const { data: joinedMeetings } = useQuery(["joinedMeetings"], () =>
    fetchJoin()
  );
  const { data: posts } = useQuery<PostType[]>(
    ["posts", groupId],
    () => fetchPost(Number(groupId)),
    { enabled: !!groupId }
  );
  const { data: notice } = useQuery(
    ["notice", groupId],
    () => fetchNotice(Number(groupId)),
    { enabled: !!groupId }
  );

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

  const favoriteGroupIdList = favoriteMeetings?.map(
    (meeting: { groupId: number }) => meeting.groupId
  );
  const joinedGroupIdList = joinedMeetings?.map(
    (meeting: { groupId: number }) => meeting.groupId
  );

  const isFavorite = favoriteGroupIdList?.includes(Number(groupId));
  const isJoined = joinedGroupIdList?.includes(Number(groupId));

  const MeetingImage = meeting && meeting.image;

  return (
    <StContainer>
      <StForm>
        <StLeftForm MeetingImage={MeetingImage}>
          <StProfileSec>
            <StTitle>{meeting && meeting.title}</StTitle>
            <StDescSec>
              <StDesc>{meeting && meeting.description}</StDesc>
              <StCategory>
                {meeting && meeting.categoryName}
                <br />
                <br />
                {meeting && meeting.locationName}
              </StCategory>
            </StDescSec>
            <StProfile>
              <StProfileImg src={meeting && meeting?.leaderProfilePicture} />
              <StProfileRight>
                <div>
                  <StNickName>{meeting && meeting?.leaderNickname}</StNickName>
                  <StProfileDesc>
                    <p>
                      {meeting && meeting?.joinedGroupMembers}/
                      {meeting && meeting?.maxMembers}명
                    </p>
                    |<p>개설일 {meeting && meeting?.createdAt}</p>
                  </StProfileDesc>
                </div>
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
                    onClick={() =>
                      deleteMeetingMutation.mutate(Number(groupId))
                    }
                  >
                    <img src={Trash} />
                    삭제
                  </StSmButton>
                  <Link to={`/meeting/${parseInt(groupId)}/members`}>
                    <StSmButton>
                      <img src={Edit} />
                      맴버
                    </StSmButton>
                  </Link>
                </StButtonLine>
              )}
              <StButtonLine>
                {isJoined ? (
                  <>
                    <StButton
                      onClick={() => {
                        if (userId === meeting.leaderEmail) {
                          Swal.fire({
                            text: "리더는 탈퇴할 수 없습니다.",
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "확인",
                          });
                        } else {
                          leaveMeetingMutation.mutate(Number(groupId));
                        }
                      }}
                    >
                      <FaHeart /> 탈퇴
                    </StButton>
                  </>
                ) : (
                  <StButton
                    onClick={() => joinMeetingMutation.mutate(Number(groupId))}
                  >
                    <FaRegHeart /> 가입
                  </StButton>
                )}
                {isFavorite ? (
                  <StButton
                    onClick={() =>
                      deleteFavoriteMutation.mutate(Number(groupId))
                    }
                  >
                    <FaHeart />
                    즐겨찾기 해제
                  </StButton>
                ) : (
                  <StButton
                    onClick={() => addFavoriteMutation.mutate(Number(groupId))}
                  >
                    <FaRegHeart />
                    즐겨찾기
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
                  {posts?.map((post) => (
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
                <p>게시판</p>
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
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
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
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  margin-bottom: 20px;
  padding-left: 10px;
`;

const StDescSec = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StCategory = styled.p`
  color: #ffffff;
  font-size: 16px;
  width: 100px;
`;

const StTitle = styled.h2`
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 50px;
  margin-top: 25px;
`;

const StDesc = styled.p`
  width: 350px;
  height: auto;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
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
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 80%;
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
  background-color: black;
  color: white;
`;

const StSmButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  background-color: black;
  color: white;
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
  height: auto;
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
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  height: 185px;
  margin-top: 10px;
  overflow-y: scroll;
  flex-direction: column;
  gap: 30px;
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
