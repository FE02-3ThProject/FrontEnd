import { useQuery } from "react-query";
import styled from "styled-components";
import { apiToken } from "../../shared/apis/Apis";
import { Link, useParams } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";
import Loading from "../../components/loading/Loading";

const deleteNotice = async (
  meetingId: string | undefined,
  noticeId: string | undefined
) => {
  if (!meetingId || !noticeId) {
    throw new Error("Meeting ID or Post ID is not provided.");
  }
  const response = await apiToken.delete(
    `/api/group/${meetingId}/notice/${noticeId}`
  );
  return response.data;
};

interface Post {
  userId: string;
  title: string;
  content: string;
  createAt: string;
}

const fetchNoticeData = async (meetingId: string, noticeId: string) => {
  const response = await apiToken.get(
    `/api/group/${meetingId}/notice/${noticeId}`
  );
  return response.data;
};

const NoticePage = () => {
  const { meetingId, noticeId } = useParams();

  if (!meetingId || !noticeId) {
    return <div>Meeting ID or Post ID is not provided.</div>;
  }

  const {
    data: notice,
    isLoading,
    isError,
    error,
  } = useQuery<Post, Error>(["notice", meetingId, noticeId], () =>
    fetchNoticeData(meetingId, noticeId)
  );

  const userId = getCookie("email");

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
        <StTitle>{notice?.title}</StTitle>
        <StContent>{notice?.content}</StContent>
        <StButtonForm>
          {notice && notice.userId === userId && (
            <>
              <Link to={`/meeting/${meetingId}/${noticeId}/noticemodification`}>
                <StButton>수정</StButton>
              </Link>
              <StButton onClick={() => deleteNotice(meetingId, noticeId)}>
                삭제
              </StButton>
            </>
          )}
        </StButtonForm>
      </StForm>
    </StContainer>
  );
};

export default NoticePage;

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
