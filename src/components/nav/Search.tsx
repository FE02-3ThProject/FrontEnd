import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiToken } from "../../shared/apis/Apis";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const locations: { [key: string]: number } = {
    서울: 1,
    경기도: 2,
    인천: 3,
    강원도: 4,
    충청남도: 5,
    대전: 6,
    충청북도: 7,
    세종시: 8,
    부산: 9,
    울산: 10,
    대구: 11,
    경상북도: 12,
    경상남도: 13,
    전라남도: 14,
    광주: 15,
    전라북도: 16,
    제주도: 17,
  };
  const categories: { [key: string]: number } = {
    게임: 1,
    여행: 2,
    운동: 3,
    책: 4,
    직무: 5,
    언어: 6,
    공연: 7,
    음악: 8,
    공예: 9,
    댄스: 10,
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async () => {
    let url;
    if (Object.prototype.hasOwnProperty.call(locations, keyword)) {
      url = `/api/group/location/${locations[keyword]}`;
    } else if (Object.prototype.hasOwnProperty.call(categories, keyword)) {
      url = `/api/group/category/${categories[keyword]}`;
    } else if (keyword !== "") {
      url = `/api/group/title/${encodeURIComponent(keyword)}`;
    } else {
      url = `/api/group/all`;
    }

    // 서버에 검색 요청을 보냅니다.
    const response = await apiToken.get(url);

    if (response.status === 200) {
      navigate(`/search/${keyword}`, {
        state: { data: response.data, keyword: keyword },
      });
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
