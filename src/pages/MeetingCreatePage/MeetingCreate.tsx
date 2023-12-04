import { useState, useRef } from "react";
import styled from "styled-components";
import Location from "../../components/location/Location";
import Category from "../../components/category/Category";
import Swal from "sweetalert2";
// import { apiToken } from "../../shared/apis/Apis";
// import { Mutation } from "react-query";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "react-query";

// const createMeeting = async (newMeeting) => {
//   const formData = new FormData();
//   Object.entries(newMeeting).forEach(([key, value]) => {
//     formData.append(key, value);
//   });
//   const response = await apiToken.post("api주소", formData);
//   return response.data;
// };

const MeetingCreate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const fileInput = useRef<HTMLInputElement>(null);

  // const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxMembers, setMaxMembers] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleInputChange =
    (setter: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // const mutation = useMutation(createMeeting, {
  //   onSuccess: () => {
  //     setTitle("");
  //     setImage(null);
  //     setLocation("");
  //     setDescription("");
  //     setMaxMembers(0);
  //     setCategory("");
  //     if (fileInput.current) {
  //       fileInput.current.value = "";
  //     }
  //     navigate("/");
  //   },
  // });

  // const handleSubmit = (event: ReactDOM.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   mutation.mutate({
  //     title: title,
  //     image: image,
  //     location: location,
  //     description: description,
  //     maxMembers: maxMembers,
  //     createdAt: today,
  //     category: category,
  //   });
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      title: title,
      image: image,
      location: location,
      description: description,
      maxMembers: maxMembers,
      createdAt: today,
      category: category,
    });

    setTitle("");
    setImage(null);
    setLocation("");
    setDescription("");
    setMaxMembers(0);
    setCategory("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    Swal.fire({
      text: "등록이 완료되었습니다.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
    });
    // navigate("/");
  };

  return (
    <StForm>
      <StContainer onSubmit={handleSubmit}>
        <StLeftForm>
          {fileInput.current?.files?.[0] ? (
            <StPrevImg src={URL.createObjectURL(fileInput.current.files[0])} />
          ) : (
            <StNoneImg></StNoneImg>
          )}

          <StPrevLabel>대표 이미지</StPrevLabel>
          <StPrevSection>
            <StPreview
              value={fileInput.current?.files?.[0]?.name || ""}
              readOnly
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
        </StLeftForm>
        <StRightForm>
          <StLabel>모임 이름</StLabel>
          <StInput
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)}
            required
          />

          <StLabel>활동 지역</StLabel>
          <Location
            value={location}
            onChange={(selectedValue) => setLocation(selectedValue)}
          />
          <StLabel>모임 설명</StLabel>
          <StInput
            type="text"
            value={description}
            onChange={handleInputChange(setDescription)}
            required
          />
          <StLabel>최대 인원</StLabel>
          <StInput
            type="number"
            min={0}
            step={1}
            value={maxMembers}
            onChange={handleInputChange(setMaxMembers)}
            required
          />
          <StLabel>카테고리</StLabel>
          <Category
            value={category}
            onChange={(selectedValue) => setCategory(selectedValue)}
          />
          <StButton>모임 생성</StButton>
        </StRightForm>
      </StContainer>
    </StForm>
  );
};

export default MeetingCreate;

const StForm = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 13px;
  width: 700px;
  height: auto;
`;

const StLeftForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const StRightForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const StInput = styled.input`
  width: 321px;
  padding: 0;
  height: 30px;
  font-size: 15px;
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const StLabel = styled.label`
  width: 321px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
  display: flex;
  justify-content: start;
  margin-top: 15px;
`;

const StPrevLabel = styled.label`
  width: 321px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 15px;
  display: flex;
  justify-content: start;
  margin-top: 15px;
`;

const StUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
  background-color: lightgray;
`;

const StPreview = styled.input`
  width: 264px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0;
  margin-top: 5px;
  margin-left: 15px;
`;

const StPrevImg = styled.img`
  height: 290px;
  width: 321px;
  display: flex;
  margin-left: 15px;
  border-radius: 5px;
  overflow: hidden;
`;

const StNoneImg = styled.div`
  height: 290px;
  width: 321px;
  display: flex;
  margin-left: 15px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const StPrevSection = styled.div`
  display: flex;
`;

const StNone = styled.input`
  display: none;
`;

const StButton = styled.button`
  width: 92%;
  margin: 15px 0 15px 10px;
  background-color: lightgray;
`;
