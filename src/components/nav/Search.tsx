import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 서버에 검색 요청을 보냅니다.
    const response = await axios.get(`/api/search?keyword=${keyword}`);

    if (response.status === 200) {
      // 요청이 성공적으로 완료되면, 검색 결과 페이지로 이동합니다.
      navigate(`/search/${keyword}`);
    } else {
      // 요청이 실패하면, 오류 메시지를 로그에 출력합니다.
      console.error(`Search failed: ${response.statusText}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StSearch>
        <StInput
          type="text"
          placeholder="어떤 모임을 찾고계신가요?"
          value={keyword}
          onChange={handleInputChange}
        />
      </StSearch>
      <StSearchIcon>
        <CiSearch />
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
  top: 17px;
  left: 480px;
`;
