import { useState, useRef } from "react";
import styled from "styled-components";
import Location from "../../components/location/Location";
import Category from "../../components/category/Category";
import Swal from "sweetalert2";
// import { apiToken } from "../../shared/apis/Apis";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "react-query";
// // import { Mutation } from "react-query";

// interface Meeting {
//   title: string;
//   image: File | null;
//   location: number;
//   description: string;
//   maxMembers: number;
//   category: number;
// }

// const createMeeting = async (newMeeting: Meeting) => {
//   const formData = new FormData();
//   Object.entries(newMeeting).forEach(([key, value]) => {
//     formData.append(key, value);
//   });
//   const response = await apiToken.post("/api/group/register", formData);
//   return response.data;
// };

const MeetingCreate = () => {
  // const date = new Date();
  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, "0");
  // const day = String(date.getDate()).padStart(2, "0");
  // const today = `${year}-${month}-${day}`;

  const fileInput = useRef<HTMLInputElement>(null);

  // const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxMembers, setMaxMembers] = useState<number>(1);
  const [category, setCategory] = useState<string>("");

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

  // const mutation = useMutation(createMeeting, {
  //   onSuccess: () => {
  //     setTitle("");
  //     setImage(null);
  //     setLocation("");
  //     setDescription("");
  //     setMaxMembers(1);
  //     setCategory("");
  //     if (fileInput.current) {
  //       fileInput.current.value = "";
  //     }
  //     Swal.fire({
  //       text: "등록이 완료되었습니다.",
  //       icon: "success",
  //       confirmButtonColor: "#3085d6",
  //       confirmButtonText: "확인",
  //     }).then(() => {
  //       navigate("/");
  //     });
  //   },
  // });

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   mutation.mutate({
  //     title: title,
  //     image: image,
  //     location: Number(location),
  //     description: description,
  //     maxMembers: Number(maxMembers),
  //     category: Number(category),
  //   });
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      title: title,
      image: image,
      locationId: Number(location),
      description: description,
      maxMembers: Number(maxMembers),
      categoryIds: Number(category),
    });

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
      text: "등록이 완료되었습니다.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
    }).then(() => {
      // navigate("/");
    });
  };

  return (
    <StForm>
      <StTitle>모임 생성</StTitle>
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
              disabled
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
            min={1}
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
  flex-direction: column;
`;

const StTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: #1981f9;
  margin-bottom: 40px;
  padding-bottom: 10px;
  width: 700px;
  border-bottom: 2px solid #1981f9;
`;

const StContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #1981f9;
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
  outline: none;
  &:focus {
    border: 1px solid #1981f9;
  }
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
  border: 1px solid #1981f9;
  background-color: #1981f9;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 15px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  &:hover {
    border: 1px solid #007aee;
    background-color: #007aee;
    color: white;
    font-weight: bold;
  }
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
  background-color: #1981f9;
  border: 1px solid #1981f9;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid #007aee;
    background-color: #007aee;
    color: white;
    font-weight: bold;
  }
`;
