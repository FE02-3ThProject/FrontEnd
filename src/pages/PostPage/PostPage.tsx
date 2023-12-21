import { useQuery } from "react-query";
import styled from "styled-components";
import { apiToken } from "../../shared/apis/Apis";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";
import Loading from "../../components/loading/Loading";

const deletePost = async (
  meetingId: number | undefined,
  postId: number | undefined
) => {
  if (!meetingId || !postId) {
    throw new Error("Meeting ID or Post ID is not provided.");
  }
  const response = await apiToken.delete(
    `/api/group/${meetingId}/post/${postId}`
  );
  return response.data;
};

interface Post {
  email: string;
  title: string;
  content: string;
  createAt: string;
}

const fetchPostData = async (meetingId: number, postId: number) => {
  const response = await apiToken.get(`/api/group/${meetingId}/post/${postId}`);
  return response.data;
};

const fetchDetails = async (groupId: number | undefined) => {
  const response = await apiToken.get(`/api/group/detail/${groupId}`);
  return response.data;
};

const PostPage = () => {
  const { meetingId, postId } = useParams();
  const navigate = useNavigate();
  const groupId = meetingId;

  if (!meetingId || !postId) {
    return <div>Meeting ID or Post ID is not provided.</div>;
  }

  const { data: meeting } = useQuery(
    ["meeting", groupId],
    () => fetchDetails(Number(groupId)),
    { enabled: !!groupId }
  );

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<Post, Error>(
    ["post", meetingId, postId],
    () => fetchPostData(Number(meetingId), Number(postId)),
    { enabled: !!meetingId && !!postId }
  );

  const userId = getCookie("email");

  const handleDeletePost = async (meetingId: string, postId: string) => {
    try {
      await deletePost(Number(meetingId), Number(postId));
      navigate(`/meeting/${meetingId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError && error instanceof Error) {
    return <StErrorView>에러가 발생했습니다: {error.message}</StErrorView>;
  }

  return (
    <StContainer>
      <StForm>
        <StTitle>{post?.title}</StTitle>
        <StContent>{post?.content}</StContent>
        <StButtonForm>
          {(post && post.email === userId) ||
          (meeting && meeting.leaderEmail === userId) ? (
            <>
              <Link to={`/meeting/${meetingId}/${postId}/post/modification`}>
                <StButton>수정</StButton>
              </Link>
              <StButton onClick={() => handleDeletePost(meetingId, postId)}>
                삭제
              </StButton>
              <StButton onClick={() => navigate(`/meeting/${meetingId}`)}>
                돌아가기
              </StButton>
            </>
          ) : (
            <StButton onClick={() => navigate(`/meeting/${meetingId}`)}>
              돌아가기
            </StButton>
          )}
        </StButtonForm>
      </StForm>
    </StContainer>
  );
};

export default PostPage;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.div`
  width: 700px;
  height: 500px;
  border: 1px solid lightgray;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 11px 13px 4px 0px #0000001a;
  position: relative;
`;

const StTitle = styled.h3`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  font-size: 34px;
  font-weight: 500;
`;

const StContent = styled.p`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
`;

const StButtonForm = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const StErrorView = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

const StButton = styled.button`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
