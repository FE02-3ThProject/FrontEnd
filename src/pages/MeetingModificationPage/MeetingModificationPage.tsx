import { Link, useNavigate, useParams } from "react-router-dom";
import { apiToken } from "../../shared/apis/Apis";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";

import Category from "../../components/category/Category";
import Location from "../../components/location/Location";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

//image import
import Banner from "../../images/meeting/Group-559.png";

interface StLeftFormProps {
  MeetingImage?: string;
}

const updateMeeting = async ({
  formData,
  meetingId,
}: {
  formData: FormData;
  meetingId: number;
}) => {
  const response = await apiToken.put(
    `/api/group/update/${meetingId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

//모임 상세조회 불러오기
const fetchDetails = async (groupId: number | undefined) => {
  const response = await apiToken.get(`/api/group/detail/${groupId}`);
  return response.data;
};

const MeetingModificationPage = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxMembers, setMaxMembers] = useState<number | string>("");
  const [category, setCategory] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const meetingId = useParams().meetingId;
  const groupId = meetingId;
  const navigate = useNavigate();
  const { data: meeting } = useQuery(["meeting"], () =>
    fetchDetails(Number(groupId))
  );
  const MeetingImage = meeting && meeting.image;
  console.log(meeting);

  const handleInputChange =
    <T extends string | number>(
      setter: React.Dispatch<React.SetStateAction<T>>
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setter(value as unknown as T);
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const mutation = useMutation<
    { formData: FormData; meetingId: number },
    unknown,
    { formData: FormData; meetingId: number },
    unknown
  >(({ formData, meetingId }) => updateMeeting({ formData, meetingId }), {
    onSuccess: () => {
      setTitle("");
      setImage(null);
      setLocation("");
      setDescription("");
      setMaxMembers(1);
      setCategory("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      Swal.fire({
        text: "수정이 완료되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then(() => {
        navigate(`/meeting/${meetingId}`);
      });
    },
  });

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    if (image) {
      formData.append("file", image);
    }
    formData.append("locationId", String(location));
    formData.append("description", description);
    formData.append("maxMembers", String(maxMembers));
    formData.append("categoryId", String(category));

    if (!meetingId) {
      throw new Error("Meeting ID is not provided.");
    }
    mutation.mutate({
      formData: formData,
      meetingId: Number(meetingId),
    });
  };
  return (
    <StContainer>
      <StForm>
        <StLeftForm MeetingImage={MeetingImage}>
          <StProfileSec>
            <StTitle>{meeting && meeting.title}</StTitle>
            <StDesc>{meeting && meeting.description}</StDesc>
            <StProfile>
              <StProfileImg src={meeting && meeting?.leaderProfilePicture} />
              <StProfileRight>
                <StNickName>{meeting && meeting.leaderNickname}</StNickName>
                <StProfileDesc>
                  <p>
                    {meeting && meeting.joinedGroupMembers}/
                    {meeting && meeting.maxMembers}
                  </p>
                  |<p>개설일 {meeting && meeting.createdAt}</p>
                </StProfileDesc>
              </StProfileRight>
            </StProfile>
          </StProfileSec>
        </StLeftForm>
        <StRightForm onSubmit={handleClick}>
          <StInputSec>
            <StLabel>모임 타이틀</StLabel>
            <StInput
              type="text"
              value={title}
              onChange={handleInputChange(setTitle)}
              required
              placeholder="이름을 입력해주세요"
            />
            <StLabel>모임 설명</StLabel>
            <StInput
              type="text"
              value={description}
              onChange={handleInputChange(setDescription)}
              required
              placeholder="설명을 입력해주세요"
            />
            <StLabel>모임 이미지</StLabel>
            <StPrevSection>
              <StPreview
                value={fileInput.current?.files?.[0]?.name || ""}
                readOnly
                disabled
                placeholder="파일 업로드"
              />
              <StUpload htmlFor="previewImg">업로드</StUpload>
            </StPrevSection>
            <StNone
              id="previewImg"
              type="file"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png"
              ref={fileInput}
              required
            />
            <StLabel>최대 인원</StLabel>
            <StInput
              type="number"
              min={1}
              max={300}
              step={1}
              value={maxMembers}
              onChange={handleInputChange(setMaxMembers)}
              placeholder="1~300까지의 인원을 입력해주세요"
              required
            />
            <StLabel>카테고리</StLabel>
            <Category
              value={category}
              onChange={(selectedValue) => setCategory(selectedValue)}
            />
            <StLabel>활동 지역</StLabel>
            <Location
              value={location}
              onChange={(selectedValue) => setLocation(selectedValue)}
            />
          </StInputSec>
          <StPostButtonSec>
            <StPostButton>모임정보수정</StPostButton>
            <Link to={`/meeting/${meetingId}`}>
              <StPostButton>돌아가기</StPostButton>
            </Link>
          </StPostButtonSec>
        </StRightForm>
      </StForm>
    </StContainer>
  );
};

export default MeetingModificationPage;

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

const StPrevSection = styled.div`
  display: flex;
  margin-left: 10px;
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

const StInput = styled.input`
  width: 554px;
  padding: 0;
  height: 61px;
  font-size: 26px;
  text-indent: 15px;
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid #909090;
  outline: none;

  &:focus {
    border: 1px solid #1981f9;
  }
`;

const StNone = styled.input`
  display: none;
`;

const StPreview = styled.input`
  width: 394px;
  height: 61px;
  font-size: 28px;
  border: 2px solid #c0edfc;
  text-indent: 15px;
  padding: 0;
  margin-top: 5px;
`;

const StUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 147px;
  height: 61px;
  border: 1px solid #01b7f2;
  background-color: #01b7f2;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: 12px;
  font-size: 28px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  &:hover {
    border: 1px solid #007aee;
    background-color: #007aee;
  }
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

const StRightForm = styled.form`
  width: 640px;
  height: 630px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;

const StLabel = styled.label`
  width: 554px;
  font-size: 15px;
  color: black;
  font-weight: bold;
  margin-left: 10px;
  display: flex;
  justify-content: start;
  margin-top: 5px;
`;

const StInputSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StPostButtonSec = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 50px;
  margin-top: 10px;
  gap: 10px;
`;
