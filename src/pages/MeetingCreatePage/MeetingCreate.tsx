import { useState, useRef } from "react";
import styled from "styled-components";
import Location from "../../components/location/Location";
import Category from "../../components/category/Category";
import Swal from "sweetalert2";
// import { apiToken } from "../../shared/apis/Apis";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "react-query";
// // import { Mutation } from "react-query";

//img Import
import login_bg from "../../../public/images/login_bg.png";

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
      <StTopImage src={login_bg} />
      <StTopContainer>
        <StTopContent>대한민국 모든 동네의 이웃이 모인 곳에</StTopContent>
        <StTopContent>새로운 모임을 알리세요!</StTopContent>
      </StTopContainer>
      <StContainer onSubmit={handleSubmit}>
        <StLeftForm>
          <StPrevLabel>대표 이미지</StPrevLabel>
          {fileInput.current?.files?.[0] ? (
            <StPrevImg src={URL.createObjectURL(fileInput.current.files[0])} />
          ) : (
            <StNoneImg></StNoneImg>
          )}

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
          <StButton>Continue</StButton>
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
  position: relative;
`;

const StTopImage = styled.img`
  margin-top: 60px;
  margin-bottom: 50px;
  width: 1920px;
  height: 400px;
`;

const StTopContainer = styled.div`
  width: 651px;
  position: absolute;
  top: 231px;
  left: 144px;
`;

const StTopContent = styled.p`
  font-size: 40px;
`;

const StContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #afafaf;
  border-radius: 20px;
  width: 1720px;
  height: 691px;
`;

const StLeftForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 554px;
  margin-right: 15px;
`;

const StRightForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 554px;
  margin-left: 15px;
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

const StLabel = styled.label`
  width: 554px;
  font-size: 19px;
  font-weight: bold;
  margin-left: 10px;
  display: flex;
  justify-content: start;
  margin-top: 15px;
`;

const StPrevLabel = styled.label`
  width: 554px;
  font-size: 19px;
  font-weight: bold;
  display: flex;
  justify-content: start;
  margin-bottom: 5px;
`;

const StUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 147px;
  height: 65px;
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

const StPreview = styled.input`
  width: 394px;
  height: 65px;
  font-size: 28px;
  border: 2px solid #c0edfc;
  // border-radius: 5px;
  text-indent: 40%;
  padding: 0;
  margin-top: 5px;
`;

const StPrevImg = styled.img`
  height: 553px;
  width: 461px;
  display: flex;
  margin-bottom: 15px;
  border: 1px solid #909090;
  overflow: hidden;
`;

const StNoneImg = styled.div`
  height: 461px;
  width: 553px;
  display: flex;
  margin-bottom: 15px;
  border: 1px solid #909090;
`;

const StPrevSection = styled.div`
  display: flex;
`;

const StNone = styled.input`
  display: none;
`;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 553px;
  height: 65px;
  font-size: 28px;
  margin: 15px 0 15px 10px;
  background-color: #ea2a2a;
  border: 1px solid #ea2a2a;
  color: #fff;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid #ea2a2a;
    background-color: #ea2a2a;
  }
`;
