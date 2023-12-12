import React from "react";
import styled from "styled-components";
import { apiToken } from "../../shared/apis/Apis";
import { Link, useParams } from "react-router-dom";

const deletePost = async (
  meetingId: string | undefined,
  postId: string | undefined
) => {
  if (!meetingId || !postId) {
    throw new Error("Meeting ID or Post ID is not provided.");
  }
  const response = await apiToken.delete(
    `/api/group/${parseInt(meetingId)}/post/${parseInt(postId)}`
  );
  return response.data;
};

const PostPage = () => {
  const { meetingId, postId } = useParams();

  console.log("meetingId: ", meetingId);
  console.log("postId: ", postId);
  return (
    <StContainer>
      <StForm>
        <StTitle>게시글 타이틀</StTitle>
        <StContent>게시글 내용</StContent>
        <StButtonForm>
          <Link to={`/meeting/${meetingId}/${postId}/modification`}>
            <StButton>수정</StButton>
          </Link>

          <StButton onClick={() => deletePost(meetingId, postId)}>
            삭제
          </StButton>
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
  width: 100%
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

const StButton = styled.button`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
