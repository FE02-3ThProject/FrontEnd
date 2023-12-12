import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { apiToken } from "../../shared/apis/Apis";

interface data {
  meetingId: string;
  title: string;
  content: string;
}

const addPost = async (data: data) => {
  const { meetingId, title, content } = data;
  if (!meetingId) {
    throw new Error("Meeting ID is not provided.");
  }
  const response = await apiToken.post(
    `/api/group/${parseInt(meetingId)}/post`,
    { title, content }
  );
  return response.data;
};

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigator = useNavigate();
  const meetingId = useParams().meetingId as string;

  const mutation = useMutation(addPost, {
    onSuccess: () => {
      Swal.fire({
        text: "게시글이 성공적으로 등록되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      navigator(`/meeting/${meetingId}`);
    },
    onError: () => {
      Swal.fire({
        text: "게시글 등록에 실패했습니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    },
  });

  const handleUpdate = async () => {
    if (title === "" || content === "") {
      Swal.fire({
        text: "타이틀과 내용을 모두 입력해주세요.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    mutation.mutate({ meetingId, title, content });
  };

  return (
    <StContainer>
      <StForm>
        <StTitle>
          <StLabel>게시글 타이틀</StLabel>
          <StInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </StTitle>
        <StContentLabel>게시글 내용</StContentLabel>
        <StInput
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <StButtonForm>
          <StButton onClick={handleUpdate}>등록</StButton>
        </StButtonForm>
      </StForm>
    </StContainer>
  );
};

export default CreatePostPage;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StForm = styled.div`
  width: 500px;
  height: 200px;
  border: 1px solid lightgray;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 11px 13px 4px 0px #0000001a;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const StTitle = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const StLabel = styled.label`
  display: flex;
  width: 90%;
`;

const StContentLabel = styled.label`
  display: flex;
  width: 90%;
  margin-top: 10px;
`;

const StInput = styled.input`
  display: flex;
  width: 90%;
  margin-top: 10px;
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
