import styled from "styled-components";
import SearchCard from "../../components/search/SearchCard";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface SearchResult {
  image: string;
  title: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  createdAt: string;
  groupId: string;
}

const SearchPageResult = () => {
  const location = useLocation();
  const initialSearchResults = location.state?.data || [];
  const keyword = location.state?.keyword || ""; // 검색 페이지에서 보낸 keyword 가져오기
  const [searchResults] = useState(initialSearchResults);

  return (
    <Stcontainer>
      {/* 검색어를 표시하는 영역 */}
      <StSearchTop>
        {searchResults.length > 0 ? (
          <div>"{keyword}"로 검색하신 결과입니다</div>
        ) : (
          <div>입력하신 "{keyword}"로는 결과값이 없습니다.</div>
        )}
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

export default SearchPageResult;

const StSearchTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1098px;
  height: 85px;
  margin: 17px 0;
  border-radius: 20px;
  background-color: #262d34;
  color: #fff;
  font-size: 25px;
  font-weight: 400;
`;

const Stcontainer = styled.div`
  width: 1098px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StSearchCon = styled.div``;
