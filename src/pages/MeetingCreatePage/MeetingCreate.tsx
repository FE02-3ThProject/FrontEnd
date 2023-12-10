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
import Banner from "../../../public/images/banner.png";
import friends from "../../../public/images/friends.png";
import Vector from "../../../public/images/pngegg.png";
import Friends2 from "../../../public/images/friends2.png";
import Footer from "../../components/layout/footer/Footer";

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
  const [maxMembers, setMaxMembers] = useState<number | string>("");
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
      <StBanner>
        <StBannerImage src={Banner} />
        <StTopContainer>
          <StTopContent>대한민국 모든 동네의 이웃이 모인 곳에</StTopContent>
          <StTopContent>새로운 모임을 알리세요!</StTopContent>
        </StTopContainer>
        <StFriendsImg src={friends} />
      </StBanner>
      <StInfomation>
        <StInfoForm>
          <StVector src={Vector} />
          <StInfo>
            <StInfoTitle>원하는 동네만 쏙쏙</StInfoTitle>
            <StInfoContent>
              모이고 싶은 동네를 직접 선택할 수 있어요.
            </StInfoContent>
          </StInfo>
        </StInfoForm>
        <StInfoForm>
          <StVector src={Vector} />
          <StInfo>
            <StInfoTitle>모모에서 보여주는 내 취미</StInfoTitle>
            <StInfoContent>
              모모에 내 모임을 등록하고, 손 쉽게 알려보세요.
            </StInfoContent>
          </StInfo>
        </StInfoForm>
      </StInfomation>
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
            placeholder="이름을 입력해주세요"
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
            placeholder="설명을 입력해주세요"
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
          <StButton>Continue</StButton>
        </StRightForm>
      </StContainer>
      <StBottom>
        <StBottomTitle>다양한 모임을 볼 수 있어요</StBottomTitle>
        <StBottomContent>
          모임?모임!에서 자기개발과 취미생활, 정보 공유까지 한번에 누려보세요
        </StBottomContent>
        <StBottomImage src={Friends2} />
      </StBottom>
      <Footer />
    </StForm>
  );
};

export default MeetingCreate;

const StForm = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const StBanner = styled.div`
  width: 100vw;
  height: 400px;
  display: flex;
  align-items: start;
`;

const StBannerImage = styled.img`
  width: 100vw;
  height: 400px;
`;

const StTopContainer = styled.div`
  width: 651px;
  position: absolute;
  top: 150px;
  left: 100px;
`;

const StTopContent = styled.p`
  font-size: 30px;
  color: white;
  font-weight: 400;
  line-height: 69px;
`;

const StFriendsImg = styled.img`
  width: 750px;
  height: 500px;
  position: absolute;
  top: 70px;
  left: 1109px;
`;

const StVector = styled.img`
  width: 55px;
  height: 55px;
`;

const StInfomation = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100vw;
  margin-top: 50px;
  margin-left: 187px;
  margin-bottom: 50px;
`;

const StInfoForm = styled.div`
  display: flex;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 460px;
  height: 88px;
  margin-left: 30px;
`;

const StInfoTitle = styled.p`
  font-weight: 400;
  font-size: 34px;
`;

const StInfoContent = styled.p`
  font-weight: 400;
  font-size: 20px;
  margin-top: 10px;
`;

const StContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #afafaf;
  border-radius: 20px;
  width: 1720px;
  height: 691px;
  box-shadow: 11px 13px 4px 0px #0000001a;
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
  color: black;
  outline: none;

  &::placeholder {
    color: black;
  }

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
  text-indent: 15px;
  padding: 0;
  margin-top: 5px;
`;

const StPrevImg = styled.img`
  height: 461px;
  width: 553px;
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
  margin: 21px 0 15px 10px;
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

const StBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StBottomTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: 400;
  margin-top: 50px;
`;

const StBottomContent = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 400;
  margin-top: 10px;
`;

const StBottomImage = styled.img`
  width: 439px;
  height: 293px;
`;
