import { useState, useRef } from "react";
import styled from "styled-components";
import Location from "../../components/location/Location";
import Category from "../../components/category/Category";

const MeetingCreate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const fileInput = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //리액트 쿼리를 이용한 API통신 로직이 들어갈 자리

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
  };

  return (
    <StContainer onSubmit={handleSubmit}>
      <h3>모임 생성</h3>
      <label>모임 이름</label>
      <input
        type="text"
        value={title}
        onChange={handleInputChange(setTitle)}
        required
      />
      <label>대표 이미지</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
        ref={fileInput}
        required
      />
      <label>활동 지역</label>
      <Location
        value={location}
        onChange={(selectedValue) => setLocation(selectedValue)}
      />
      <label>모임 설명</label>
      <input
        type="text"
        value={description}
        onChange={handleInputChange(setDescription)}
        required
      />
      <label>최대 인원</label>
      <input
        type="number"
        min={0}
        step={1}
        value={maxMembers}
        onChange={handleInputChange(setMaxMembers)}
        required
      />
      <label>카테고리</label>
      <Category
        value={category}
        onChange={(selectedValue) => setCategory(selectedValue)}
      />
      <button>모임 생성</button>
    </StContainer>
  );
};

export default MeetingCreate;

const StContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 13px;
  width: 300px;
  height: 400px;
`;
