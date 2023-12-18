import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiToken } from "../../shared/apis/Apis";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const locations = [
    "서울",
    "경기도",
    "인천",
    "강원도",
    "충청남도",
    "대전",
    "충청북도",
    "세종시",
    "부산",
    "울산",
    "대구",
    "경상북도",
    "경상남도",
    "전라남도",
    "광주",
    "전라북도",
    "제주도",
  ];
  const categories = [
    "게임",
    "여행",
    "운동",
    "책",
    "직무",
    "언어",
    "공연",
    "음악",
    "공예",
    "댄스",
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async () => {
    let url;
    if (locations.includes(keyword)) {
      url = `/api/group/location/${encodeURIComponent(keyword)}`;
    } else if (categories.includes(keyword)) {
      url = `/api/group/category/${encodeURIComponent(keyword)}`;
    } else if (keyword !== "") {
      url = `/api/group/title/${encodeURIComponent(keyword)}`;
    } else {
      url = `/api/group/all`;
    }

    const response = await apiToken.get(url);

    if (response.status === 200) {
      navigate(`/search/${keyword}`, { state: { data: response.data } });
    } else {
      console.error(`Search failed: ${response.statusText}`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <StSearch>
        <StInput
          type="text"
          placeholder="어떤 모임을 찾고 계신가요?"
          value={keyword}
          onChange={handleInputChange}
        />
      </StSearch>
      <StSearchIcon>
        <CiSearch onClick={handleSubmit} />
      </StSearchIcon>
    </form>
  );
};

export default Search;

const StSearch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StInput = styled.input`
  width: 200px;
  height: 25px;
  border-radius: 15px;
  padding-left: 15px;
  margin-left: 10px;
  background-color: #333;
  color: #fff;
  outline: none;
  &::placeholder {
    color: #fff;
  }
`;

const StSearchIcon = styled.div`
  position: absolute;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  top: 19px;
  left: 480px;
  cursor: pointer;
`;
