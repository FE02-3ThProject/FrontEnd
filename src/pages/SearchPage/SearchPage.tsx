import styled from "styled-components";
import AvatarImg from "../../images/avatar_default.png";
import SearchCard from "../../components/search/SearchCard";
import { useState, ChangeEvent } from "react";
import { apiToken } from "../../shared/apis/Apis";
import { useLocation } from "react-router-dom";

interface SearchResult {
  image: string;
  title: string;
  description: string;
  joinedGroupMembers: number;
  maxMembers: number;
  createdAt: string;
  groupId: string;
}

const SearchPage = () => {
  const location = useLocation();
  const initialSearchResults = location.state?.data || [];
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState(initialSearchResults);

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
      // 요청이 성공적으로 완료되면, 검색 결과를 상태변수에 저장합니다.
      setSearchResults(response.data);
    } else {
      // 요청이 실패하면, 오류 메시지를 로그에 출력합니다.
      console.error(`Search failed: ${response.statusText}`);
    }
  };

  return (
    <Stcontainer>
      <StSearchTop>
        <StAvatar></StAvatar>
        <StInputArea>
          <StInput
            type="text"
            placeholder="지금 무슨 생각을 하고 있나요?"
            value={keyword}
            onChange={handleInputChange}
          />
        </StInputArea>
        <StSearchButton onClick={handleSubmit}>Create Post</StSearchButton>
      </StSearchTop>
      <StSearchCon>
        {searchResults &&
          searchResults.map((result: SearchResult, index: number) => (
            <SearchCard key={index} result={result} />
          ))}
      </StSearchCon>
    </Stcontainer>
  );
};

export default SearchPage;

const Stcontainer = styled.div`
  width: 1098px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StSearchTop = styled.div`
  display: flex;
  align-items: center;
  width: 1098px;
  height: 85px;
  margin: 17px 0;
  border-radius: 20px;
  background-color: #262d34;
`;

const StAvatar = styled.div`
  margin: 12px 28px 12px 21px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: url(${AvatarImg});
`;

const StInputArea = styled.div``;

const StInput = styled.input`
  width: 820px;
  height: 56px;
  margin-right: 20px;
  background-color: #2c353d;
  border: none;
  border-radius: 10px;
  padding-left: 15px;
  color: #fff;
`;

const StSearchButton = styled.button`
  background-color: #ff6934;
  color: #fff;
  font-weight: 400;
`;

const StSearchCon = styled.div``;
